package org.eventhub.main.service.impl;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import com.sendgrid.helpers.mail.objects.Personalization;
import org.eventhub.main.dto.EmailRequest;
import org.eventhub.main.service.EmailService;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.UUID;

@Service
public class EmailServiceImpl implements EmailService {
    private final SendGrid sendGrid;
    private final Email emailFrom;

    public EmailServiceImpl(){
        String key = System.getenv("sendgrid_key");
        this.sendGrid = new SendGrid(key);
        this.emailFrom = new Email("protsnazar2004@gmail.com");
    }
    @Override
    public Response sendEmail(EmailRequest emailRequest) throws IOException {
        String subject = emailRequest.getSubject();
        Email to = new Email(emailRequest.getTo());
        Content content = new Content("text/html", emailRequest.getBody());
        Mail mail = new Mail(this.emailFrom, subject, to, content);

        Request request = new Request();

        request.setMethod(Method.POST);
        request.setEndpoint("mail/send");
        request.setBody(mail.build());
        return this.sendGrid.api(request);
    }

    @Override
    public Response sendVerificationEmail(UUID tokenId, EmailRequest emailRequest) throws IOException {
        String verificationEndPoint = "http://localhost:3000/confirm/" + tokenId.toString();

        String subject = emailRequest.getSubject();
        Email to = new Email(emailRequest.getTo());
        Content content = new Content("text/html", emailRequest.getBody());
        Mail mail = new Mail(this.emailFrom, subject, to, content);

        Personalization personalization = new Personalization();
        personalization.addTo(to);

        personalization.addDynamicTemplateData("first_name", emailRequest.getName());
        personalization.addDynamicTemplateData("url",verificationEndPoint);
        mail.addPersonalization(personalization);
        mail.setTemplateId(System.getenv("template_id"));

        Request request = new Request();

        request.setMethod(Method.POST);
        request.setEndpoint("mail/send");
        request.setBody(mail.build());
        return this.sendGrid.api(request);
    }
}
