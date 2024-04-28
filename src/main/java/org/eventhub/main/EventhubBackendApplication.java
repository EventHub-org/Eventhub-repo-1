package org.eventhub.main;

import org.eventhub.main.service.impl.OuterEventServiceImpl;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

import java.util.ArrayList;

@SpringBootApplication
public class EventhubBackendApplication {

	public static void main(String[] args) {
		OuterEventServiceImpl.crawlContramarka(2, "https://lviv.kontramarka.ua/uk",  new ArrayList<>());
//		OuterEventServiceImpl.request("https://lviv.travel/ua/events");
//		SpringApplication.run(EventhubBackendApplication.class, args);
	}

}
