package com.adoptify.controller;

import com.adoptify.dto.*;
import com.adoptify.model.User;
import com.adoptify.service.AuthService;
import com.adoptify.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class AuthController {

    @Autowired
    private AuthService authService;

	@Autowired
	private UserService userService;


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        if (request.getUsername() == null || request.getPassword() == null ||
                request.getUsername().isEmpty() || request.getPassword().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nombre de usuario y contraseña son obligatorios");
        }

        try {
            AuthResponse authResponse = authService.login(request);
            return ResponseEntity.ok(authResponse);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales no válidas");
        }
    }

    @PostMapping("/validate")
    public ResponseEntity<?> validate(@RequestParam String token, @RequestBody RequestDto requestDto) {
        System.out.println("Token: " + token);
        System.out.println("RequestDto: " + requestDto);

        AuthResponse tokenDto = authService.validate(token, requestDto);
        if (tokenDto == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token inválido o solicitud incorrecta");
        }
        return ResponseEntity.ok(tokenDto);
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

   @PostMapping(value = "register/protectora")
    public ResponseEntity<?> registerProtectora(@RequestBody ProtectoraProfileRequest request) {
        try {
            AuthResponse authResponse = authService.registerProtectora(request);
            return ResponseEntity.ok(authResponse);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }


	@PutMapping("/user/{id}")
	public ResponseEntity<Void> updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO) {
		userService.updateUser(id, userDTO);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/user/{id}")
	public ResponseEntity<?> getUserById(@PathVariable Long id){
		Optional<User> optionalUser = userService.getUser(id);
		if (optionalUser.isPresent()) {
			return ResponseEntity.ok().body(optionalUser);
		}else {
			return ResponseEntity.badRequest().body("Usuario no encontrado");
		}
	}

}
