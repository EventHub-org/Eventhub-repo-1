package org.eventhub.main.service;

import org.eventhub.main.model.PasswordResetToken;
import org.eventhub.main.model.User;

import java.util.UUID;

public interface PasswordResetTokenService {
    PasswordResetToken create(User user);
    PasswordResetToken read(UUID id);
    void delete(UUID id);
}
