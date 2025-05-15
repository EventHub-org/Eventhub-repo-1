package org.eventhub.main.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="photos")
public class Photo {
    @Id
    @Column(name = "id")
    private UUID id;

    @NotBlank(message = "The 'Name' cannot be empty")
    @Column(name="photo_name")
    private String photoName;

    @NotBlank(message = "The 'URL' cannot be empty")
    @Column(name="photo_url", columnDefinition = "TEXT")
    private String photoUrl;
}
