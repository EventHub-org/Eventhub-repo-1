package org.eventhub.main;

import groovy.util.logging.Slf4j;
import org.eventhub.main.controller.VectorSearchController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.result.view.RedirectView;

import java.security.Principal;
import java.util.Collections;
import java.util.Map;

@RestController
@Slf4j
public class OAuth2Controller {
    private final OAuth2AuthorizedClientService clientService;
    private final Logger logger = LoggerFactory.getLogger(OAuth2Controller.class);
    @Autowired
    public OAuth2Controller(OAuth2AuthorizedClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping("/logine/google")
    public RedirectView loginSuccess(@AuthenticationPrincipal OAuth2User principal) {
        logger.info("Inside oauth controller!!!");

//        OAuth2AuthorizedClient client = clientService.loadAuthorizedClient(
//                authenticationToken.getAuthorizedClientRegistrationId(),
//                authenticationToken.getName()
//        );
//        logger.info("Princip name: " + principal.getName());



        return new RedirectView("http://localhost:3000/");
    }

    @GetMapping
    public RedirectView loginSuccess2(@AuthenticationPrincipal OAuth2User principal) {
        logger.info("Inside oauth controller!!!");

//        OAuth2AuthorizedClient client = clientService.loadAuthorizedClient(
//                authenticationToken.getAuthorizedClientRegistrationId(),
//                authenticationToken.getName()
//        );
        logger.info("Princip name: " + principal.getName());



        return new RedirectView("http://localhost:3000/");
    }
}
