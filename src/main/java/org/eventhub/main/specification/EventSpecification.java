package org.eventhub.main.specification;

import org.eventhub.main.model.Event;
import org.springframework.data.jpa.domain.Specification;

import java.util.UUID;

public class EventSpecification {
    private EventSpecification(){}
    public static Specification<Event> findUserEvents(UUID uuid){
        return null;
    }
    public static Specification<Event> findJoinedEvents(UUID uuid){
        return null;
    }

    public static Specification<Event> findPendingEvents(UUID uuid){
        return null;
    }

    public static Specification<Event> findArchiveEvents(UUID uuid){
        return null;
    }
}
