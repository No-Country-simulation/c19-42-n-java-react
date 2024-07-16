package com.adoptify.controller;

import com.adoptify.dto.AdoptanteProfileRequest;
import com.adoptify.dto.AuthResponse;
import com.adoptify.dto.LoginRequest;
import com.adoptify.dto.ProtectoraProfileRequest;
import com.adoptify.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private AuthService authService;


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // Verificar si el nombre de usuario y la contraseña no están vacíos
        if (request.getUsername() == null || request.getPassword() == null ||
                request.getUsername().isEmpty() || request.getPassword().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nombre de usuario y contraseña son obligatorios");
        }

        try {
            // Realizar la autenticación
            AuthResponse authResponse = authService.login(request);
            return ResponseEntity.ok(authResponse);
        } catch (AuthenticationException e) {
            // Manejar casos en los que la autenticación falle
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales no válidas");
        }
    }

    @PostMapping("/register/adoptante")
    public ResponseEntity<?> registerAdoptante(@RequestBody AdoptanteProfileRequest request) {
        try {
            AuthResponse authResponse = authService.registerAdoptante(request);
            return ResponseEntity.ok(authResponse);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

   /** @PostMapping(value = "register/protectora")
    public ResponseEntity<?> registerProtectora(@RequestBody ProtectoraProfileRequest request) {
        try {
            AuthResponse authResponse = authService.registerProtectora(request);
            return ResponseEntity.ok(authResponse);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
**/


}
