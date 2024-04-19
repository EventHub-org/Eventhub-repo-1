package org.eventhub.main.controller;

import lombok.RequiredArgsConstructor;
import org.eventhub.main.config.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/token")
@RequiredArgsConstructor
public class TokenController {

    private final JwtService jwtService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<UUID> getToken(@RequestHeader("Authorization") String token) {
        UUID id = jwtService.getId(token);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }
}
