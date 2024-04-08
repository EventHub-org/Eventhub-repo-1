package org.eventhub.main.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "outer_events")
public class OuterEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotBlank(message = "Name is mandatory")
    @Size(max = 30, min = 5,
            message = "Name length cannot be greater than 20 symbols")
    @Column(name = "title", unique = true)
    private String title;

    @NotBlank(message = "Description is mandatory")
    @Size(max = 255,
            message = "Description length cannot be greater than 255 symbols")
    @Column(name = "description")
    private String description;

    @NotNull
    @Column(name = "location")
    private String location;

    @NotNull
    @Column(name = "latitude", precision = 8, scale = 6)
    private BigDecimal latitude;

    @NotNull
    @Column(name = "longitude", precision = 9, scale = 6)
    private BigDecimal longitude;

    @NotNull
    @Column(name = "start_at")
    private LocalDateTime startAt;

    @NotNull
    @Column(name = "expire_at")
    private LocalDateTime expireAt;

    @OneToOne(cascade = CascadeType.REMOVE)
    private Photo photo = new Photo();
}
