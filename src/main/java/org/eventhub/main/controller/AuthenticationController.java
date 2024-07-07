package org.eventhub.main.controller;

import groovy.util.logging.Slf4j;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.eventhub.main.config.AuthenticationService;
import org.eventhub.main.dto.*;
import org.eventhub.main.exception.AccessIsDeniedException;
import org.eventhub.main.exception.NotValidRefreshTokenException;
import org.eventhub.main.exception.ResponseStatusException;
import org.eventhub.main.model.RefreshToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.eventhub.main.model.User;
import org.eventhub.main.service.ConfirmationTokenService;
import org.eventhub.main.service.EmailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


import java.security.GeneralSecurityException;

import java.io.IOException;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/authentication")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authService;
    private final Logger log = LoggerFactory.getLogger(AuthenticationController.class);
    private final ConfirmationTokenService confirmationTokenService;
    private final EmailService emailService;


    @PostMapping("/register")
    public ResponseEntity<String> register(@Validated @RequestBody UserRequestCreate userRequest, BindingResult result) throws IOException {
        log.info("Registering...");
        if (result.hasErrors()) {
            throw new ResponseStatusException(Objects.requireNonNull(result.getFieldError()).getDefaultMessage());
        }

        User user = this.authService.register(userRequest);
        return new ResponseEntity<>(user.getEmail(), HttpStatus.CREATED);
    }

    @GetMapping("/resend")
    public ResponseEntity<String> resendVerificationEmail(@RequestParam("email") String email) throws IOException {
        authService.resendRegistrationEmail(email);

        log.info("**/resend confirmation email to = " + email);
        return new ResponseEntity<>(email, HttpStatus.CREATED);
    }

    @GetMapping("/confirm-account")
    public ResponseEntity<JwtResponse> confirm(@RequestParam("token")String confirmationToken) {
        log.info("**/confirm token(id) = " + confirmationToken);
        return ResponseEntity.ok(authService.confirm(confirmationToken));
    }

    @GetMapping("forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestParam("email")String email) throws IOException {
        authService.resetPassword(email);

        log.info("**/check email to reset password = " + email);
        return new ResponseEntity<>(email, HttpStatus.OK);
    }

    @PostMapping("forgot-password")
    public ResponseEntity<String> resetPassword(@Validated @RequestBody PasswordResetRequest request, HttpServletResponse response, BindingResult result) {
        log.info("**/reset password, token = " + request.getToken());

        if(result.hasErrors()){
            throw new ResponseStatusException(Objects.requireNonNull(result.getFieldError()).getDefaultMessage());
        }

        JwtResponse jwtResponse = authService.confirmResetPassword(request);

        setRefreshTokenCookies(jwtResponse, response);

        return ResponseEntity.ok(jwtResponse.getAccessToken());
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AuthenticationRequest request, HttpServletResponse response) {
        log.info("Logging in");

        JwtResponse jwtResponse = authService.login(request);

        log.info("Logged in");

        setRefreshTokenCookies(jwtResponse, response);

        return ResponseEntity.ok(jwtResponse.getAccessToken());
    }
    @PostMapping("/google")
    public ResponseEntity<GoogleJwtResponse> googleAuthentication(@RequestBody GoogleOauthRequest request, HttpServletResponse response) throws GeneralSecurityException, IOException {
        log.info("Authorizing with google");

        GoogleJwtResponse jwtResponse = authService.googleLogin(request);

        Cookie refreshTokenCookie = new Cookie("refreshToken", jwtResponse.getRefreshToken());
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(false); // Set to true in production
        refreshTokenCookie.setPath("/"); // Define the path where the cookie is accessible
        refreshTokenCookie.setMaxAge((int) jwtResponse.getExpiryDate().toInstant().getEpochSecond());

        // Add the cookie to the response
        response.addCookie(refreshTokenCookie);

        return ResponseEntity.ok(jwtResponse);
    }
    @GetMapping("/is-registered")
    public ResponseEntity<Boolean> isUserRegistered(@RequestBody GoogleOauthRequest request) throws GeneralSecurityException, IOException {
        return ResponseEntity.ok(authService.isUserRegistered(request));
    }



    @GetMapping("/refreshToken")
    public ResponseEntity<String> refreshToken(HttpServletRequest request, HttpServletResponse response) {
        log.info("Refreshing token");

        String refreshToken = null;

        // Get cookies from the request
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("refreshToken".equals(cookie.getName())) {
                    refreshToken = cookie.getValue();
                }
            }
        }

        if (refreshToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No refresh token");
        }

        JwtResponse jwtResponse;
        try {
             jwtResponse = authService.refreshToken(refreshToken);
        }
        catch (NotValidRefreshTokenException ex) {
            removeRefreshTokenCookies(response);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
        }


        return ResponseEntity.ok(jwtResponse.getAccessToken());
    }

    @PostMapping("/logout")
    public ResponseEntity<OperationResponse> logout(@RequestHeader("Authorization") String token, HttpServletResponse response) {
        authService.logout(token);
        removeRefreshTokenCookies(response);
        log.info("Logged out");
        return new ResponseEntity<>(new OperationResponse("Refresh token deleted successfully"), HttpStatus.OK);
    }

    private void setRefreshTokenCookies(JwtResponse jwtResponse, HttpServletResponse response) {
        Cookie refreshTokenCookie = new Cookie("refreshToken", jwtResponse.getRefreshToken());
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(false); // Set to true in production
        refreshTokenCookie.setPath("/"); // Define the path where the cookie is accessible
        refreshTokenCookie.setMaxAge((int) jwtResponse.getExpiryDate().toInstant().getEpochSecond());

        // Add the cookie to the response
        response.addCookie(refreshTokenCookie);

        log.info("Added cookie, val: " + jwtResponse.getRefreshToken());

    }
    private void removeRefreshTokenCookies(HttpServletResponse response) {
        Cookie refreshTokenCookie = new Cookie("refreshToken", "");
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(0);
        response.addCookie(refreshTokenCookie);

        log.info("Refresh token cookies removed");
    }
}
