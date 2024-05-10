package org.eventhub.main.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class OAuthGoogleRequest {
    private String aud;

    private String azp;

    private String email;

    private boolean emailVerified;

    private long exp;

    private String familyName;

    private String givenName;

    private long iat;

    private String iss;

    private String jti;

    private String name;

    private long nbf;

    private String picture;

    private String sub;

    public OAuthGoogleRequest(String aud, String azp, String email, boolean emailVerified, long exp, String familyName, String givenName, long iat, String iss, String jti, String name, long nbf, String picture, String sub) {
        this.aud = aud;
        this.azp = azp;
        this.email = email;
        this.emailVerified = emailVerified;
        this.exp = exp;
        this.familyName = familyName;
        this.givenName = givenName;
        this.iat = iat;
        this.iss = iss;
        this.jti = jti;
        this.name = name;
        this.nbf = nbf;
        this.picture = picture;
        this.sub = sub;
    }
}
