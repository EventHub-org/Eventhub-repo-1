package org.eventhub.main.service;

import com.sendgrid.Response;
import org.eventhub.main.dto.EmailRequest;

import java.io.IOException;
import java.util.UUID;

public interface EmailService {
    Response sendEmail(EmailRequest request) throws IOException;
    Response sendVerificationEmail(UUID tokenId, EmailRequest emailRequest) throws IOException;
}
