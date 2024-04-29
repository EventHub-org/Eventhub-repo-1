package org.eventhub.main.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class GeocodeResponse {
    private List<Result> results;
    private String status;

    @Data
    public static class Result {
        private List<AddressComponent> addressComponents;
        private String formattedAddress;
        private Geometry geometry;
        private String placeId;
        private PlusCode plusCode;
        private List<String> types;
    }

    @Data
    public static class AddressComponent {
        private String longName;
        private String shortName;
        private List<String> types;
    }

    @Data
    public static class Geometry {
        private Location location;
        private String locationType;
        private Viewport viewport;
    }

    @Data
    public static class Location {
        private BigDecimal lat;
        private BigDecimal lng;
    }

    @Data
    public static class Viewport {
        private Location northeast;
        private Location southwest;
    }

    @Data
    public static class PlusCode {
        private String compoundCode;
        private String globalCode;
    }
}
