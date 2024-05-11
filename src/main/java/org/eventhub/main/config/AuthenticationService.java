package org.eventhub.main.config;

import com.google.api.client.http.HttpTransport;
import groovy.util.logging.Slf4j;
import lombok.RequiredArgsConstructor;
import org.eventhub.main.dto.*;
import org.eventhub.main.exception.AccessIsDeniedException;
import org.eventhub.main.mapper.RegisterMapper;
import org.eventhub.main.model.User;
import org.eventhub.main.repository.UserRepository;
import org.eventhub.main.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.json.JsonFactory;


import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final RegisterMapper registerMapper;

    private final Logger logger = LoggerFactory.getLogger(AuthenticationService.class);

    @Value("${google.clientId}")
    private String googleClientId;

    public AuthenticationResponce register(RegisterRequest registerRequest) {
        if (registerRequest.getPassword() != null) {
            registerRequest.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        }
        logger.info("Inside register meth");

        UserRequestCreate userRequest = registerMapper.requestToEntity(registerRequest, new UserRequestCreate());
        UserResponse userResponse = userService.create(userRequest);
        var user = userRepository.findByEmail(userRequest.getEmail());

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
    public AuthenticationResponce googleLogin(GoogleOauthRequest request) throws GeneralSecurityException, IOException {
        HttpTransport transport = new com.google.api.client.http.javanet.NetHttpTransport();
        JsonFactory jsonFactory = com.google.api.client.json.gson.GsonFactory.getDefaultInstance();

        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                .setAudience(Collections.singletonList(googleClientId))
                .build();

        logger.info("Verified google client");

        GoogleIdToken idToken = verifier.verify(request.getGoogleToken());
        if (idToken != null) {
            Payload payload = idToken.getPayload();

            User user = userRepository.findByEmail(payload.getEmail());
            if (user != null) {
                Map<String, Object> extraClaims = new HashMap<>();
                extraClaims.put("id", user.getId());

                var jwtToken = jwtService.generateToken(extraClaims, user);
                return AuthenticationResponce.builder()
                        .token(jwtToken)
                        .build();
            }


            RegisterRequest registerRequest = registerMapper.googlePayloadToRegisterRequest(payload);
            return register(registerRequest);


        } else {
            throw new AccessIsDeniedException("Invalid ID token.");
        }
    }
}
