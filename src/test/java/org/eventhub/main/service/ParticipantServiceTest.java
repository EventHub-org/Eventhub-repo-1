package org.eventhub.main.service;

import jakarta.persistence.EntityNotFoundException;
import org.eventhub.main.dto.ParticipantRequest;
import org.eventhub.main.dto.ParticipantResponse;
import org.eventhub.main.exception.NullDtoReferenceException;
import org.eventhub.main.exception.NullEntityReferenceException;
import org.eventhub.main.model.Participant;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@SpringBootTest
public class ParticipantServiceTest {
    private final ParticipantService participantService;
    private static final UUID EXISTING_EVENT_ID = UUID.fromString("00000000-0000-0000-0000-000000000030");
    private static final UUID EXISTING_USER_ID = UUID.fromString("00000000-0000-0000-0000-000000000010");
    private static final UUID EXISTING_USER_ID_2 = UUID.fromString("00000000-0000-0000-0000-000000000011");
    private static final UUID NON_EXISTENT_ID = UUID.fromString("00000000-0000-0000-0000-000000000100");
    private static final UUID EXISTING_PARTICIPANT_ID = UUID.fromString("00000000-0000-0000-0000-000000000010");

    @Autowired
    public ParticipantServiceTest(ParticipantService participantService){
        this.participantService = participantService;
    }

    @Test
    public void createValidParticipantTest(){
        ParticipantRequest request = new ParticipantRequest(EXISTING_EVENT_ID, EXISTING_USER_ID, false);
        ParticipantResponse response = participantService.create(request);

        Assertions.assertNotNull(response);
        Assertions.assertEquals(6, participantService.getAll().size());
        Assertions.assertEquals(request.getEventId(), response.getEventId());
        Assertions.assertEquals(request.getUserId(), response.getUserId());
        Assertions.assertNotNull(response.getId());

        participantService.delete(response.getId());
    }

    @Test
    public void createInvalidParticipantTest1(){
        ParticipantRequest request = new ParticipantRequest(EXISTING_EVENT_ID, NON_EXISTENT_ID, false);
        Assertions.assertThrows(NullEntityReferenceException.class, () -> participantService.create(request));
    }

    @Test
    public void createInvalidParticipantTest2(){
        ParticipantRequest request = new ParticipantRequest(NON_EXISTENT_ID, EXISTING_USER_ID, false);
        Assertions.assertThrows(NullEntityReferenceException.class, () -> participantService.create(request));
    }

    @Test
    public void createInvalidParticipantTest3(){
        Assertions.assertThrows(NullDtoReferenceException.class, () -> participantService.create(null));
    }

    @Test
    public void readByIdValidParticipantTest(){
        ParticipantResponse actual = participantService.readById(EXISTING_PARTICIPANT_ID);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSSSSS");
        LocalDateTime localDateTime = LocalDateTime.parse("2020-11-16 14:00:04.810221", formatter);

        ParticipantResponse expected = new ParticipantResponse(EXISTING_PARTICIPANT_ID, localDateTime, false, EXISTING_EVENT_ID, EXISTING_USER_ID_2);
        Assertions.assertNotNull(actual);
        Assertions.assertEquals(expected, actual);
        Assertions.assertEquals(5, participantService.getAll().size());
    }

    @Test
    public void readByIdInvalidParticipantTest(){
        Assertions.assertThrows(EntityNotFoundException.class, () -> participantService.readById(NON_EXISTENT_ID));
    }

    @Test
    public void readByIdEntityValidParticipantTest(){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSSSSS");
        LocalDateTime localDateTime = LocalDateTime.parse("2020-11-16 14:00:04.810221", formatter);

        Participant actual = participantService.readByIdEntity(EXISTING_PARTICIPANT_ID);

        Assertions.assertNotNull(actual);
        Assertions.assertEquals(EXISTING_PARTICIPANT_ID, actual.getId());
        Assertions.assertFalse(actual.isApproved());
        Assertions.assertEquals(EXISTING_EVENT_ID, actual.getEvent().getId());
        Assertions.assertEquals(EXISTING_USER_ID_2, actual.getUser().getId());
        Assertions.assertEquals(localDateTime, actual.getCreatedAt());
        Assertions.assertEquals(5, participantService.getAll().size());
    }

    @Test
    public void updateValidParticipantTest(){
        ParticipantResponse response = participantService.create(new ParticipantRequest(EXISTING_EVENT_ID, EXISTING_USER_ID, false));
        ParticipantRequest request = new ParticipantRequest(EXISTING_EVENT_ID, EXISTING_USER_ID_2, true);
        ParticipantResponse actual = participantService.update(request, response.getId());

        Assertions.assertNotNull(actual);
        Assertions.assertEquals(participantService.readById(response.getId()), actual);
        Assertions.assertEquals(6, participantService.getAll().size());

        participantService.delete(response.getId());
    }

    @Test
    public void updateInvalidParticipantTest1(){
        Assertions.assertThrows(NullDtoReferenceException.class, () -> participantService.update(null, EXISTING_PARTICIPANT_ID));
    }

    @Test
    void updateInvalidParticipantTest2(){
        Assertions.assertThrows(EntityNotFoundException.class, () -> participantService.update(new ParticipantRequest(EXISTING_EVENT_ID, EXISTING_USER_ID_2, true), NON_EXISTENT_ID));
    }

    @Test
    void updateInvalidParticipantTest3(){
        Assertions.assertThrows(NullEntityReferenceException.class, () -> participantService.update(new ParticipantRequest(NON_EXISTENT_ID, EXISTING_USER_ID_2, true), EXISTING_PARTICIPANT_ID));
    }

    @Test
    void updateInvalidParticipantTest4(){
        Assertions.assertThrows(NullEntityReferenceException.class, () -> participantService.update(new ParticipantRequest(EXISTING_EVENT_ID, NON_EXISTENT_ID, true), EXISTING_PARTICIPANT_ID));
    }

    @Test
    void deleteValidParticipantTest(){
        ParticipantRequest request = new ParticipantRequest(EXISTING_EVENT_ID, EXISTING_USER_ID, false);
        ParticipantResponse response = participantService.create(request);

        Assertions.assertNotNull(response);
        Assertions.assertEquals(6, participantService.getAll().size());

        participantService.delete(response.getId());

        Assertions.assertEquals(5, participantService.getAll().size());
    }

    @Test
    void deleteInvalidParticipantTest(){
        Assertions.assertThrows(EntityNotFoundException.class, () -> participantService.delete(NON_EXISTENT_ID));
    }

    @Test
    void getAllValidParticipantTest(){
        ParticipantRequest request = new ParticipantRequest(EXISTING_EVENT_ID, EXISTING_USER_ID, false);
        ParticipantResponse response = participantService.create(request);

        Assertions.assertEquals(6, participantService.getAll().size());
        participantService.delete(response.getId());
    }
}
