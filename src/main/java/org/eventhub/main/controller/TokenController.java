package org.eventhub.main.controller;

import lombok.RequiredArgsConstructor;
import org.eventhub.main.config.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/token")
@RequiredArgsConstructor
public class TokenController {

    private final JwtService jwtService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> getToken(@RequestHeader("Authorization") String token) {
        String validToken = token.substring(7);
        String id = jwtService.extractClaim(validToken, claims -> {
            return claims.get("id", String.class);
        });
        return new ResponseEntity<>(id, HttpStatus.OK);
    }
}
