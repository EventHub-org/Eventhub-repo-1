package org.eventhub.main.config;

import lombok.RequiredArgsConstructor;
import org.eventhub.main.dto.*;
import org.eventhub.main.exception.AccessIsDeniedException;
import org.eventhub.main.model.ConfirmationToken;
import org.eventhub.main.model.User;
import org.eventhub.main.repository.UserRepository;
import org.eventhub.main.service.ConfirmationTokenService;
import org.eventhub.main.service.UserService;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Timer;
import java.util.TimerTask;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final ConfirmationTokenService confirmationTokenService;
    private final ThreadPoolTaskScheduler scheduler;

    private void scheduleConfirmationTask(String email) {
        int timeForVerification = 75;
        scheduler.schedule(() -> {
            User user = userService.findByEmail(email);
            if (!user.isVerified()) {
                userService.delete(user.getId());
            }
        }, Instant.now().plusSeconds(timeForVerification));
    }

    public User register(UserRequestCreate registerRequest) {
        registerRequest.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        UserResponse userResponse = userService.create(registerRequest);

        scheduleConfirmationTask(userResponse.getEmail());
        return userRepository.findByEmail(userResponse.getEmail());
    }

    public AuthenticationResponce confirm(UUID confirmationTokenId){
        ConfirmationToken token = this.confirmationTokenService.read(confirmationTokenId);
        User user = token.getUser();
        user.setVerified(true);
        this.userRepository.save(user);

        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("id", user.getId());

        var jwtToken = jwtService.generateToken(extraClaims, user);
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
