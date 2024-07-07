package org.eventhub.main.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("jwt")
public record JWTConfigProperties(String secretKey) {
}
