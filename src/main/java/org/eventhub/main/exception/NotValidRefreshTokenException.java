package org.eventhub.main.exception;

public class NotValidRefreshTokenException extends RuntimeException{
    public NotValidRefreshTokenException() {
    }

    public NotValidRefreshTokenException(String message) {
        super(message);
    }
}
