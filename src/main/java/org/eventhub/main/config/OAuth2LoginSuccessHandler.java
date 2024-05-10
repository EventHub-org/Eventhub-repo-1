package org.eventhub.main.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import groovy.util.logging.Slf4j;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.eventhub.main.controller.VectorSearchController;
import org.eventhub.main.dto.RegisterRequest;
import org.eventhub.main.dto.UserRequestCreate;
import org.eventhub.main.dto.UserResponse;
import org.eventhub.main.mapper.RegisterMapper;
import org.eventhub.main.model.Gender;
import org.eventhub.main.model.User;
import org.eventhub.main.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
//@Slf4j
public class OAuth2LoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

//    private final Logger logger = LoggerFactory.getLogger(OAuth2LoginSuccessHandler.class);
    private final UserService userService;
    private final JwtService jwtService;
    private final RegisterMapper registerMapper;

    public OAuth2LoginSuccessHandler(UserService userService, JwtService jwtService, RegisterMapper registerMapper) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.registerMapper = registerMapper;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {
        OAuth2AuthenticationToken oAuth2AuthenticationToken = (OAuth2AuthenticationToken) authentication;
        DefaultOAuth2User principal = (DefaultOAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = principal.getAttributes();
        if ("github".equals(oAuth2AuthenticationToken.getAuthorizedClientRegistrationId())) {

            String email = attributes.getOrDefault("email", "").toString();
            String name = attributes.getOrDefault("name", "").toString();

            RegisterRequest registerRequest = new RegisterRequest();
            registerRequest.setEmail(email);
//            registerRequest.s
//            this.logger.info(email);


//            userService.findByEmail(email)
//                    .ifPresentOrElse(user -> {
//                        DefaultOAuth2User newUser = new DefaultOAuth2User(List.of(new SimpleGrantedAuthority(user.getRole().name())),
//                                attributes, "id");
//                        Authentication securityAuth = new OAuth2AuthenticationToken(newUser, List.of(new SimpleGrantedAuthority(user.getRole().name())),
//                                oAuth2AuthenticationToken.getAuthorizedClientRegistrationId());
//                        SecurityContextHolder.getContext().setAuthentication(securityAuth);
//                    }, () -> {
//                        UserEntity userEntity = new UserEntity();
//                        userEntity.setRole(UserRole.ROLE_USER);
//                        userEntity.setEmail(email);
//                        userEntity.setName(name);
//                        userEntity.setSource(RegistrationSource.GITHUB);
//                        userService.save(userEntity);
//                        DefaultOAuth2User newUser = new DefaultOAuth2User(List.of(new SimpleGrantedAuthority(userEntity.getRole().name())),
//                                attributes, "id");
//                        Authentication securityAuth = new OAuth2AuthenticationToken(newUser, List.of(new SimpleGrantedAuthority(userEntity.getRole().name())),
//                                oAuth2AuthenticationToken.getAuthorizedClientRegistrationId());
//                        SecurityContextHolder.getContext().setAuthentication(securityAuth);
//                    });
        }

        else if ("google".equals(oAuth2AuthenticationToken.getAuthorizedClientRegistrationId())) {
            String email = attributes.getOrDefault("email", "").toString();

            if (userService.findByEmail(email) != null ) {

            }
            String name = attributes.getOrDefault("name", "").toString();
            String[] dividedName = name.split(" ");
            String firstName = dividedName[0];
            String lastName = dividedName[1];


            RegisterRequest registerRequest = new RegisterRequest();
            registerRequest.setEmail(email);
            registerRequest.setFirstName(firstName);
            registerRequest.setLastName(lastName);
            registerRequest.setCity("Test");
            registerRequest.setGender(Gender.MALE);
            registerRequest.setUsername("testUsername");

            UserRequestCreate userRequest = registerMapper.requestToEntity(registerRequest, new UserRequestCreate());
            UserResponse userResponse = userService.create(userRequest);
            User user = userService.findByEmail(email);

            Map<String, Object> extraClaims = new HashMap<>();
            extraClaims.put("id", user.getId());
            String jwtToken = jwtService.generateToken(extraClaims, user);

//            // Create a cookie to store the JWT token
//            Map<String, Object> responseBody = new HashMap<>();
//            responseBody.put("token", jwtToken);
//            // You can add other data to the response body if needed
//
//            // Write the response
//            ObjectMapper objectMapper = new ObjectMapper();
//            response.setContentType("application/json");
//            response.setCharacterEncoding("UTF-8");
//            response.getWriter().write(objectMapper.writeValueAsString(responseBody));



//            authenticationService.register(registerRequest);
        }
        this.setAlwaysUseDefaultTargetUrl(true);
        this.setDefaultTargetUrl("http://localhost:3000/");




        super.onAuthenticationSuccess(request, response, authentication);
    }
}
