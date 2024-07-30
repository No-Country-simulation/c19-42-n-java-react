package com.adoptify.security.jwt;

import com.adoptify.dto.AdoptanteResponse;
import com.adoptify.dto.ProtectoraResponse;
import com.adoptify.dto.RequestDto;
import com.adoptify.feign.AdoptanteClient;
import com.adoptify.feign.ProtectoraClient;
import com.adoptify.model.User;
import com.adoptify.security.RouteValidator;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.security.SecureRandom;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;


@Component
public class JwtService {

    private Key secret;

    @Autowired
    private RouteValidator routeValidator;

	@Autowired
	private AdoptanteClient adoptanteClient;

	@Autowired
	private ProtectoraClient protectoraClient;


    @Value("${security.jwt.secret}")
    private String jwtSecret;

    @PostConstruct
    protected void init() {
        byte[] apiKeySecretBytes = new byte[64]; // 512 bits
        new SecureRandom().nextBytes(apiKeySecretBytes);
        secret = Keys.hmacShaKeyFor(apiKeySecretBytes);
    }

    public String createToken(User authUser){
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", authUser.getId());


		// Convertir la lista de roles en una cadena
		String roles = authUser.getRoles().stream()
			.map(role -> role.getName().toString())
			.collect(Collectors.joining(","));
		claims.put("role", roles);

		// Agregar el ID de Adoptante o Protectora según el rol
		if (roles.contains("ROLE_ADOPTANTE")) {
			Long adoptanteId = getAdoptanteId(authUser.getId());
			claims.put("adoptanteId", adoptanteId);
		} else if (roles.contains("ROLE_PROTECTORA")) {
			Long protectoraId = getProtectoraId(authUser.getId());
			claims.put("protectoraId", protectoraId);
		}

        Date now = new Date();
        Date exp = new Date(now.getTime() + 3600000); // 1 hora de validez

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(authUser.getUsername())
                .setIssuedAt(now)
                .setExpiration(exp)
                .signWith(secret, SignatureAlgorithm.HS512)
                .compact();
    }

	private Long getAdoptanteId(Long userId) {
		ResponseEntity<AdoptanteResponse> response = adoptanteClient.getAdoptanteByUserId(userId);
		return response.getBody().getId();
	}

	private Long getProtectoraId(Long userId) {
		ResponseEntity<ProtectoraResponse> response = protectoraClient.getProtectoraByUserId(userId);
		return response.getBody().getId();
	}

    public boolean validate(String token, RequestDto requestDto){
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(secret)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            // Additional validation logic if required
            if (!isProtectora(claims) && routeValidator.isProtectora(requestDto)) {
                return false;
            }
            return true;
        } catch (Exception exception) {
            return false;
        }
    }

    public String getUserNameFromToken(String token){
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(secret)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            return claims.getSubject();
        } catch (Exception exception) {
            return "Bad token";
        }
    }

	private boolean isProtectora(Claims claims) {
		String role = claims.get("role").toString();
		return role.contains("ROLE_PROTECTORA") || role.contains("ROLE_ADMIN") || role.contains("ROLE_ADOPTANTE");
	}

}
