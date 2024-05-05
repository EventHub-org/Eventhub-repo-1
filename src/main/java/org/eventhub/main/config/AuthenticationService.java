package org.eventhub.main.config;

import lombok.RequiredArgsConstructor;
import org.eventhub.main.dto.*;
import org.eventhub.main.exception.AccessIsDeniedException;
import org.eventhub.main.model.ConfirmationToken;
import org.eventhub.main.model.User;
import org.eventhub.main.repository.UserRepository;
import org.eventhub.main.service.ConfirmationTokenService;
import org.eventhub.main.service.EmailService;
import org.eventhub.main.service.UserService;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Timer;
import java.util.TimerTask;

import java.util.*;
import java.util.concurrent.ScheduledFuture;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final ConfirmationTokenService confirmationTokenService;
    private final EmailService emailService;
    private final ThreadPoolTaskScheduler scheduler;
    private final Map<String, ScheduledFuture<?>> confirmationTasks = new HashMap<>();


    private void scheduleConfirmationTask(String email) {
        int timeForVerification = 68;
        ScheduledFuture<?> task = scheduler.schedule(() -> {
            User user = userService.findByEmail(email);
            if (!user.isVerified()) {
                userService.delete(user.getId());
            }

            confirmationTasks.remove(email);
        }, Instant.now().plusSeconds(timeForVerification));

        confirmationTasks.put(email, task);
    }

    private void cancelConfirmationTask(String email) {
        ScheduledFuture<?> task = confirmationTasks.get(email);
        if (task != null && !task.isDone()) {
            task.cancel(true);
            confirmationTasks.remove(email);
        }
    }

    public User register(UserRequestCreate registerRequest) throws IOException {
        registerRequest.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        UserResponse userResponse = userService.create(registerRequest);

        User user = userService.findByEmail(userResponse.getEmail());
        ConfirmationToken confirmationToken = confirmationTokenService.create(user);
        
        EmailRequest emailRequest = new EmailRequest(registerRequest.getEmail(),"Verify email", "Please, verify your email", registerRequest.getFirstName());
        emailService.sendVerificationEmail(confirmationToken.getId(), emailRequest);

        scheduleConfirmationTask(userResponse.getEmail());
        return userService.findByEmail(userResponse.getEmail());
    }

    public void resendRegistrationEmail(String email) throws IOException {
        User user = userService.findByEmail(email);

        EmailRequest emailRequest = new EmailRequest(email, "Verify email", "Please, verify your email", user.getFirstName());
        emailService.sendVerificationEmail(user.getId(), emailRequest);

        cancelConfirmationTask(email);
        scheduleConfirmationTask(email);
    }

    public AuthenticationResponce confirm(UUID confirmationTokenId){
        ConfirmationToken token = this.confirmationTokenService.read(confirmationTokenId);
        UUID userId = token.getUser().getId();

        userService.confirmUser(userId);

        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("id", userId);

        var jwtToken = jwtService.generateToken(extraClaims, userService.readByIdEntity(userId));
        return AuthenticationResponce.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponce login(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByEmail(request.getEmail());
        if(!user.isVerified()){
            throw new AccessIsDeniedException("Your account is not verified yet!");
        }

        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("id", user.getId());

        var jwtToken = jwtService.generateToken(extraClaims, user);
        return AuthenticationResponce.builder()
                .token(jwtToken)
                .build();
    }
}
