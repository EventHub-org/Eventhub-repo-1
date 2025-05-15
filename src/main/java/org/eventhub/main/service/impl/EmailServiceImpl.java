package org.eventhub.main.service.impl;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.eventhub.main.service.EmailService;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Map;

@Service
@AllArgsConstructor
public class EmailServiceImpl implements EmailService {
    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    public void sendVerificationEmail(String to, String verificationUrl) {
        Map<String, Object> variables = Map.of("verificationUrl", verificationUrl);
        sendEmail(to, "verification_template", "Verify your email", variables);
    }

    public void sendForgotPasswordEmail(String to, String forgotPasswordUrl) {
        Map<String, Object> variables = Map.of("forgotPasswordUrl", forgotPasswordUrl);
        sendEmail(to, "forgot_password_template", "Reset your password", variables);
    }

    private void sendEmail(String to, String templateName, String subject, Map<String, Object> variables) {
        String content = createEmailTemplate(variables, templateName);

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);

        try {
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(content, true);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email", e);
        }

        mailSender.send(mimeMessage);
    }

    private String createEmailTemplate(Map<String, Object> vars, String templateName) {
        Context context = new Context();
        context.setVariables(vars);
        return templateEngine.process(templateName, context);
    }
}
