package org.eventhub.main;

import org.eventhub.main.service.impl.OuterEventServiceImpl;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
public class EventhubBackendApplication {

	public static void main(String[] args) {
		OuterEventServiceImpl.crawlContramarka();
//		OuterEventServiceImpl.request("https://lviv.travel/ua/events");
//		SpringApplication.run(EventhubBackendApplication.class, args);
	}

}
