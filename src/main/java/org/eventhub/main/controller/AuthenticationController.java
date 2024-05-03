package org.eventhub.main.controller;

import com.sendgrid.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.eventhub.main.config.AuthenticationService;
import org.eventhub.main.dto.*;
import org.eventhub.main.exception.ResponseStatusException;
import org.eventhub.main.model.ConfirmationToken;
import org.eventhub.main.model.User;
import org.eventhub.main.service.ConfirmationTokenService;
import org.eventhub.main.service.EmailService;
import org.eventhub.main.service.impl.EmailServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Objects;
import java.util.UUID;

@RestController
@Slf4j
@RequestMapping("/authentication")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authService;
    private final ConfirmationTokenService confirmationTokenService;
    private final EmailService emailService;


//    @PostMapping("/register")
//    public ResponseEntity<AuthenticationResponce> register(@RequestBody UserRequest request) {
//        return ResponseEntity.ok(authService.register(request));
//    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@Validated @RequestBody UserRequestCreate userRequest, BindingResult result) throws IOException {
        if (result.hasErrors()) {
            throw new ResponseStatusException(Objects.requireNonNull(result.getFieldError()).getDefaultMessage());
        }

        User user = this.authService.register(userRequest);
        ConfirmationToken confirmationToken = this.confirmationTokenService.create(user);

        EmailRequest emailRequest = new EmailRequest(userRequest.getEmail(),"Verify email", "Please, verify your email", userRequest.getFirstName());
        Response email = this.emailService.sendVerificationEmail(confirmationToken.getId(), emailRequest);


        return new ResponseEntity<>(user.getEmail(), HttpStatus.CREATED);
    }
    @GetMapping("/confirm-account")
    public ResponseEntity<AuthenticationResponce> confirm(@RequestParam("token")String confirmationToken) {
        log.info("**/confirm token(id) = " + confirmationToken);
        return ResponseEntity.ok(authService.confirm(UUID.fromString(confirmationToken)));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponce> login(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}
