package org.eventhub.main.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.eventhub.main.dto.*;
import org.eventhub.main.mapper.RegisterMapper;
import org.eventhub.main.mapper.UserMapper;
import org.eventhub.main.model.ConfirmationToken;
import org.eventhub.main.model.User;
import org.eventhub.main.repository.UserRepository;
import org.eventhub.main.service.ConfirmationTokenService;
import org.eventhub.main.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.net.PasswordAuthentication;
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

    public User register(UserRequestCreate registerRequest) {
        registerRequest.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        UserResponse userResponse = userService.create(registerRequest);

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

        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("id", user.getId());

        var jwtToken = jwtService.generateToken(extraClaims, user);
        return AuthenticationResponce.builder()
                .token(jwtToken)
                .build();
    }
}
