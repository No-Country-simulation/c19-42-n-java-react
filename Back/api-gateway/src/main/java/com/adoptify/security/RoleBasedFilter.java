package com.adoptify.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import javax.crypto.SecretKey;

@Component
public class RoleBasedFilter extends AbstractGatewayFilterFactory<RoleBasedFilter.Config> {

    @Value("${jwt.secret}")
    private String secret;

    public static class Config {
        private String role;

        // Getters and setters
        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }
    }

    public RoleBasedFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            if (!exchange.getRequest().getHeaders().containsKey("Authorization")) {
                return this.onError(exchange, "No Authorization header", HttpStatus.UNAUTHORIZED);
            }

            String token = exchange.getRequest().getHeaders().getOrEmpty("Authorization").get(0);
            if (!token.startsWith("Bearer ")) {
                return this.onError(exchange, "No Bearer token", HttpStatus.UNAUTHORIZED);
            }

            token = token.substring(7);
            try {
                SecretKey key = Keys.hmacShaKeyFor(secret.getBytes());
                Claims claims = Jwts.parserBuilder()
                        .setSigningKey(key)
                        .build()
                        .parseClaimsJws(token)
                        .getBody();
                String role = String.valueOf(claims.get("role"));
                if (!role.equals(config.getRole())) {
                    return this.onError(exchange, "Unauthorized role", HttpStatus.FORBIDDEN);
                }
            } catch (Exception e) {
                return this.onError(exchange, "Invalid token", HttpStatus.UNAUTHORIZED);
            }

            return chain.filter(exchange);
        };
    }

    private Mono<Void> onError(ServerWebExchange exchange, String err, HttpStatus httpStatus) {
        exchange.getResponse().setStatusCode(httpStatus);
        return exchange.getResponse().setComplete();
    }
}
