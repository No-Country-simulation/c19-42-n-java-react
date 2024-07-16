package com.adoptify.service;

import com.adoptify.dto.AdoptanteProfileRequest;
import com.adoptify.dto.AuthResponse;
import com.adoptify.dto.LoginRequest;
import com.adoptify.dto.ProtectoraProfileRequest;
import com.adoptify.model.ERole;
import com.adoptify.model.Role;
import com.adoptify.model.User;
import com.adoptify.repository.RoleRepository;
import com.adoptify.repository.UserRepository;
import com.adoptify.security.jwt.JwtService;
import com.adoptify.feign.AdoptanteClient;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtService jwtService;
    private final RoleService rolService;
    private final UserRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final RoleRepository roleRepository;
    private final AdoptanteClient adoptanteClient;



    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(),request.getPassword()));
        User user = usuarioRepository.findByUsername(request.getUsername()).orElseThrow(null);
        String token = jwtService.getToken(user);
        return AuthResponse.builder()
                .token(token)
                .build();
    }

    public AuthResponse registerAdoptante(AdoptanteProfileRequest request) {
        if (usuarioRepository.existsByUsername(request.getEmail())) {
            throw new RuntimeException("Error: Username is already taken!");
        }

        User user = new User(request.getUsername(), passwordEncoder.encode(request.getPassword()));
        Role adoptanteRole = roleRepository.findByName(ERole.ROLE_ADOPTANTE)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        user.setRoles(Set.of(adoptanteRole));
        user = usuarioRepository.save(user);

        // Register adoptante profile
        request.setUsuarioId(user.getId());
        adoptanteClient.createAdoptanteProfile(request);

        String token = jwtService.getToken(user);

        return AuthResponse.builder()
                .token(token)
                .build();
    }

    /**public AuthResponse registerProtectora(ProtectoraProfileRequest request) {
        if (usuarioRepository.existsByUsername(request.get())) {
            throw new RuntimeException("Error: Username is already taken!");
        }

        User user = new User(request.getUsername(), passwordEncoder.encode(request.getPassword()));
        Role protectoraRole = roleRepository.findByName("ROLE_PROTECTORA")
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        user.setRoles(Set.of(protectoraRole));
        user = userRepository.save(user);

        // Register protectora profile
        protectoraClient.createProtectoraProfile(request);

        String token = jwtService.getToken(user);

        return AuthResponse.builder()
                .token(token)
                .build();
    }
**/


}
