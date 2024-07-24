package com.adoptify.service;

import com.adoptify.dto.*;
import com.adoptify.feign.ProtectoraClient;
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

import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtService jwtService;
    private final RoleService rolService;
    private final UserRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final AdoptanteClient adoptanteClient;
    private final ProtectoraClient protectoraClient;



    public AuthResponse login(LoginRequest request) {
        Optional<User> user = usuarioRepository.findByUsername(request.getUsername());
        if(!user.isPresent()){
            return null;
        }
        if(passwordEncoder.matches(request.getPassword(),user.get().getPassword())){
            return new AuthResponse(jwtService.createToken(user.get()));
        }
        return null;
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

        String token = jwtService.createToken(user);

        return AuthResponse.builder()
                .token(token)
                .build();
    }

    public AuthResponse validate(String token, RequestDto requestDto){
        if(!jwtService.validate(token,requestDto)){
            return null;
        }
        String userName = jwtService.getUserNameFromToken(token);
        if(!usuarioRepository.findByUsername(userName).isPresent()){
            return null;
        }
        return new AuthResponse(token);
    }

    public AuthResponse registerProtectora(ProtectoraProfileRequest request) {
        if (usuarioRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Error: Username is already taken!");
        }

        User user = new User(request.getUsername(), passwordEncoder.encode(request.getPassword()));
        Role protectoraRole = roleRepository.findByName(ERole.ROLE_PROTECTORA)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        user.setRoles(Set.of(protectoraRole));
        user = usuarioRepository.save(user);

        // Register protectora profile
		request.setUsuarioId(user.getId());
        protectoraClient.createProtectoraProfile(request);

        String token = jwtService.createToken(user);

        return AuthResponse.builder()
                .token(token)
                .build();
    }



}
