package org.eventhub.main.specification;

import jakarta.persistence.criteria.Join;
import org.eventhub.main.dto.CheckboxRequest;
import org.eventhub.main.model.Event;
import org.eventhub.main.model.Participant;
import org.eventhub.main.model.User;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;
import java.util.UUID;

public class EventSpecification {
    private EventSpecification(){}

    public static Specification<Event> checkBoxFilter(CheckboxRequest checkboxRequest){
        UUID userId = checkboxRequest.getUserId();

        return Specification.where(checkboxRequest.isMyEvents()?findUserEvents(userId):null)
                .or(checkboxRequest.isJoinedEvents()?findJoinedEvents(userId):null)
                .or(checkboxRequest.isPendingEvents()?findPendingEvents(userId):null)
                .or(checkboxRequest.isArchiveEvents()?findArchiveEvents(userId):null);
    }
    private static Specification<Event> findUserEvents(UUID userId){
        return (root, query, builder) -> {
            Join<Event, User> ownerJoin = root.join("owner");
            return builder.equal(ownerJoin.get("id"), userId);
        };
    }
    private static Specification<Event> findJoinedEvents(UUID userId){
        return (root, query, builder) -> {
            Join<Event, Participant> participantJoin = root.join("participants");
            Join<Participant, User> userJoin = participantJoin.join("user");

            return builder.and(
                    builder.equal(userJoin.get("id"), userId),
                    builder.isTrue(participantJoin.get("isApproved"))
            );

        };
    }

    private static Specification<Event> findPendingEvents(UUID userId){
        return (root, query, builder) -> {
            Join<Event, Participant> participantJoin = root.join("participants");
            Join<Participant, User> userJoin = participantJoin.join("user");

            return builder.and(
                    builder.equal(userJoin.get("id"), userId),
                    builder.isFalse(participantJoin.get("isApproved"))
            );

        };
    }

    private static Specification<Event> findArchiveEvents(UUID userId){
        LocalDateTime currentTime = LocalDateTime.now();

        return (root, query,builder)-> {
            Join<Event, User> ownerJoin = root.join("owner");

            return builder.and(
                    builder.equal(ownerJoin.get("id"), userId),
                    builder.lessThanOrEqualTo(root.get("expireAt"), currentTime)
            );
        };
    }
}
