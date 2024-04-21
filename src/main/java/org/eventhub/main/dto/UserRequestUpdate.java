package org.eventhub.main.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;
import org.eventhub.main.model.Gender;

import java.time.LocalDate;

@Data
@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class UserRequestUpdate {
    @Pattern(regexp = "[A-Z][a-z]+",
            message = "Must start with a capital letter followed by one or more lowercase letters")
    private String firstName;

    @Pattern(regexp = "[A-Z][a-z]+",
            message = "Must start with a capital letter followed by one or more lowercase letters")
    private String lastName;

    @Size(min = 3, max = 15, message = "Username must be between 3 to 15 characters")
    private String username;

    @Pattern(regexp = "[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}", message = "Must be a valid e-mail address")
    private String email;

    @Size(max = 255,
            message = "Description length cannot be greater than 255 symbols")
    private String description;

    private String city;

    @Past(message = "Birthday has to be in the past")
    private LocalDate birthDate;

    @Enumerated(EnumType.STRING)
    private Gender gender;
    private boolean showEmail;

    public UserRequestUpdate() {}

    public UserRequestUpdate(String firstName, String lastName, String username, String email, String description, String city, LocalDate birthDate, Gender gender, boolean showEmail) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.description = description;
        this.city = city;
        this.birthDate = birthDate;
        this.gender = gender;
        this.showEmail = showEmail;
    }
}