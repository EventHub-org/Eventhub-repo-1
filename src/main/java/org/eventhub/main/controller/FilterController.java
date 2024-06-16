package org.eventhub.main.controller;

import lombok.extern.slf4j.Slf4j;
import org.eventhub.main.config.AuthenticationService;
import org.eventhub.main.config.JwtService;
import org.eventhub.main.dto.CheckboxRequest;
import org.eventhub.main.dto.EventFilterRequest;
import org.eventhub.main.dto.EventResponseXY;
import org.eventhub.main.dto.EventSearchResponse;
import org.eventhub.main.service.FilterService;
import org.eventhub.main.service.RefreshTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@Slf4j
@RequestMapping
public class FilterController {
    private final FilterService filterService;
    private final JwtService jwtService;

    @Autowired
    public FilterController(FilterService filterService, JwtService jwtService){
        this.filterService = filterService;
        this.jwtService = jwtService;
    }

    @PostMapping("/events/filter")
    public ResponseEntity<List<EventSearchResponse>> filter(@RequestBody EventFilterRequest request) {
        log.info("**/get filtered events");
        return new ResponseEntity<>(filterService.filterEvents(request), HttpStatus.OK);
    }

    @GetMapping("/events/checkbox-filter")
    public ResponseEntity<List<EventSearchResponse>> checkboxFilter(@RequestParam(value = "my_events") boolean myEvents,
                                                                    @RequestParam("joined_events") boolean joinedEvents,
                                                                    @RequestParam("pending_event") boolean pendingEvents,
                                                                    @RequestParam("archive_events") boolean archiveEvents,
                                                                    @RequestHeader("Authorization") String token) {
//        if(jwtService.isExpired(token)){
//            authenticationService.refreshToken(refreshToken);
//        }
        CheckboxRequest request = new CheckboxRequest(jwtService.getId(token), myEvents, joinedEvents, pendingEvents, archiveEvents);
        log.info("**/get filtered events with checkbox");
        return new ResponseEntity<>(filterService.filterCheckboxEvents(request), HttpStatus.OK);
    }

    @GetMapping("/events/all-live-upcoming")
    public ResponseEntity<List<EventResponseXY>> getAllLiveAndUpcoming() {
        log.info("**/get all live and upcoming events ");
        return new ResponseEntity<>(filterService.allLiveAndUpcomingEvents(), HttpStatus.OK);
    }
}
