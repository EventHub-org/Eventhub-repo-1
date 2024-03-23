package org.eventhub.main.service;

import org.eventhub.main.dto.EventFullInfoResponse;
import org.eventhub.main.dto.EventRequest;
import org.eventhub.main.dto.EventResponse;
import org.eventhub.main.model.Event;
import org.eventhub.main.model.Photo;

import java.util.List;
import java.util.UUID;

public interface EventService {
    EventFullInfoResponse create(EventRequest eventRequest);
    EventFullInfoResponse readById(UUID id);

    Event readByIdEntity(UUID id);

    Event readByTitle(String title);
    EventFullInfoResponse update(EventRequest eventRequest);
    void delete(UUID id);
    List<EventFullInfoResponse> getAllFullInfo();
    List<EventResponse> getAll();
    void addImage(UUID eventId, Photo image);
    void deleteImage(UUID eventId, Photo image);
}
