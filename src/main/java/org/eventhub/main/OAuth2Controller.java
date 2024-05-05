package org.eventhub.main;

import groovy.util.logging.Slf4j;
import org.eventhub.main.controller.VectorSearchController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.result.view.RedirectView;

@RestController
@Slf4j
public class OAuth2Controller {
    private final OAuth2AuthorizedClientService clientService;
    private final Logger logger = LoggerFactory.getLogger(OAuth2Controller.class);
    @Autowired
    public OAuth2Controller(OAuth2AuthorizedClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping("/login/oauth2/code/{provider}")
    public RedirectView loginSuccess(@PathVariable String provider, OAuth2AuthenticationToken authenticationToken) {
        logger.info("Inside oauth controller!!!");
        OAuth2AuthorizedClient client = clientService.loadAuthorizedClient(
                authenticationToken.getAuthorizedClientRegistrationId(),
                authenticationToken.getName()
        );

        String userEmail = (String) client.getPrincipalName();
        String provider1 = authenticationToken.getAuthorizedClientRegistrationId();

        return new RedirectView("/login-success");
    }
}
