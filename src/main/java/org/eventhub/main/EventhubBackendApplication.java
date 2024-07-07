package org.eventhub.main;

import org.eventhub.main.config.JWTConfigProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableConfigurationProperties(JWTConfigProperties.class)
@EnableAsync
public class EventhubBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(EventhubBackendApplication.class, args);
	}

}
