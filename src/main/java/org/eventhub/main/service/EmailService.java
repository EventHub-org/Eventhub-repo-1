package org.eventhub.main.service;

import com.sendgrid.Response;
import org.eventhub.main.dto.EmailRequest;

import java.io.IOException;
import java.util.UUID;

public interface EmailService {
    Response sendVerificationEmail(UUID tokenId, EmailRequest emailRequest) throws IOException;
}
