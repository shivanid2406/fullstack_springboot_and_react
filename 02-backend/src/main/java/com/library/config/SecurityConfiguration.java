package com.library.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;
 
@Configuration
public class SecurityConfiguration {

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
 
//      disable cross request site forgery
        http.csrf(AbstractHttpConfigurer::disable);
        http.authorizeHttpRequests(configurer ->
                configurer
                    .antMatchers("/api/books/secure/**","/api/reviews/secure/**","/api/messages/secure/**","/api/admin/secure/**").authenticated()
                    .antMatchers("/api/books/**", "/api/reviews/**","/api/messages/**","/api/admin/**").permitAll())
            .oauth2ResourceServer((oauth2) -> oauth2
                .jwt(Customizer.withDefaults())
            );
 
//      add cors filter
        http.cors(Customizer.withDefaults());
//      add content negotiation strategy
        http.setSharedObject(ContentNegotiationStrategy.class, new HeaderContentNegotiationStrategy());
//      Force a non-empty response body to make unauthorized response body more friendly.
        Okta.configureResourceServer401ResponseBody(http);
        return http.build();
    }
}