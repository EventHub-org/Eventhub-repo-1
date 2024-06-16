package org.eventhub.main.specification;

import jakarta.persistence.criteria.Join;
import org.eventhub.main.model.Event;
import org.eventhub.main.model.Participant;
import org.eventhub.main.model.User;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;
import java.util.UUID;

public class EventSpecification {
    private EventSpecification(){}
    public static Specification<Event> findUserEvents(UUID userId){
        return (root, query, builder) -> builder.equal(root.get("owner"), userId);
    }
    public static Specification<Event> findJoinedEvents(UUID userId){
        return (root, query, builder) -> {
            Join<Event, Participant> participantJoin = root.join("participants");
            Join<Participant, User> userJoin = root.join("users");

            return builder.and(
                    builder.equal(userJoin.get("id"), userId),
                    builder.isTrue(participantJoin.get("isApproved"))
            );

        };
    }

    public static Specification<Event> findPendingEvents(UUID userId){
        return (root, query, builder) -> {
            Join<Event, Participant> participantJoin = root.join("participants");
            Join<Participant, User> userJoin = root.join("users");

            return builder.and(
                    builder.equal(userJoin.get("id"), userId),
                    builder.isFalse(participantJoin.get("isApproved"))
            );

        };
    }

    public static Specification<Event> findArchiveEvents(UUID userId){
        LocalDateTime currentTime = LocalDateTime.now();
        return (root, query,builder)-> builder.and(
                builder.equal(root.get("owner"), userId),
                builder.lessThanOrEqualTo(root.get("expireAt"), currentTime)
        );
    }
}
