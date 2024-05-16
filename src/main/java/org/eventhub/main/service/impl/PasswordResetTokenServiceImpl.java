package org.eventhub.main.service.impl;

import jakarta.persistence.EntityNotFoundException;
import org.eventhub.main.model.ConfirmationToken;
import org.eventhub.main.model.PasswordResetToken;
import org.eventhub.main.model.User;
import org.eventhub.main.repository.PasswordResetTokenRepository;
import org.eventhub.main.service.PasswordResetTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

@Service
public class PasswordResetTokenServiceImpl implements PasswordResetTokenService {
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    @Autowired
    public PasswordResetTokenServiceImpl(PasswordResetTokenRepository passwordResetTokenRepository){
        this.passwordResetTokenRepository = passwordResetTokenRepository;
    }

    @Override
    public PasswordResetToken create(User user) {
        PasswordResetToken token = new PasswordResetToken();
        Calendar calendar = Calendar.getInstance();

        calendar.setTime(new Date());
        calendar.add(Calendar.HOUR_OF_DAY, 2);
        Date expiryDate = calendar.getTime();

        token.setUser(user);
        token.setExpiryDate(expiryDate);

        return this.passwordResetTokenRepository.save(token);
    }

    @Override
    public PasswordResetToken read(UUID id) {
        return this.passwordResetTokenRepository.findById(id).orElseThrow(()->new EntityNotFoundException("Token is not valid!"));

    }

    @Override
    public void delete(UUID id) {
        this.read(id);
        this.passwordResetTokenRepository.deleteById(id);
    }
}
