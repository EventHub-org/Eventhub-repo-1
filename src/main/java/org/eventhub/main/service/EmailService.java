package org.eventhub.main.service;

import org.eventhub.main.dto.EmailRequest;
import org.eventhub.main.dto.UserResponse;
import org.eventhub.main.dto.UserResponseBriefInfo;
import org.eventhub.main.model.Event;
import org.eventhub.main.model.User;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

public interface EmailService {
    void sendVerificationEmail(String to, String verificationUrl);
    void sendForgotPasswordEmail(String to, String forgotPasswordUrl);
//    Response sendEmailAboutUpdate(List<User> user, UUID eventId, String title) throws IOException;
//    Response sendEventCancellationEmail(List<User> users, String eventTitle) throws IOException;
//    Response sendApprovalEmail(User user, UUID eventId, String title)throws IOException;
//    Response sendExclusionEmail(User user, String title) throws  IOException;
}
