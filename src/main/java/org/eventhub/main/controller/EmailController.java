package org.eventhub.main.controller;

import com.sendgrid.Response;
import lombok.extern.slf4j.Slf4j;
import org.eventhub.main.dto.EmailRequest;
import org.eventhub.main.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.UUID;

@RestController
@Slf4j
@RequestMapping("/email")
public class EmailController {
    private final EmailService emailService;

    @Autowired
    public EmailController(EmailService emailService){
        this.emailService = emailService;
    }

    @PostMapping("/send")
    public ResponseEntity<String>sendEmail(@RequestBody EmailRequest request) throws IOException {

        Response response = this.emailService.sendEmail(request);
        if(response.getStatusCode()==200 || response.getStatusCode()==202){
            log.info("**/send successfully");
            return new ResponseEntity<>("send successfully", HttpStatus.OK);
        }
        log.error("failed to send");
        return new ResponseEntity<>("failed to send", HttpStatus.NOT_FOUND);
    }

    @PostMapping("/verify")
    public ResponseEntity<String>sendVerificationEmail(@RequestBody EmailRequest request) throws IOException {

        Response response = this.emailService.sendVerificationEmail(UUID.fromString("9a070957-1eb8-4c23-a5f7-d448168e7166"),request);
        if(response.getStatusCode()==200 || response.getStatusCode()==202){
            log.info("**/send successfully");
            return new ResponseEntity<>("send successfully", HttpStatus.OK);
        }
        log.error("failed to send");
        return new ResponseEntity<>("failed to send", HttpStatus.NOT_FOUND);
    }
}
