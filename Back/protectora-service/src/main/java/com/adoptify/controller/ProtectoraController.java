package com.adoptify.controller;

import com.adoptify.dto.ProtectoraDTO;
import com.adoptify.model.Protectora;
import com.adoptify.service.ProtectoraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/protectora")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class ProtectoraController {

    @Autowired
    private ProtectoraService service;

    @PostMapping
    public ResponseEntity<?> registerProtectora(@RequestBody Protectora protectora){
        try {
            Protectora createdProtectora = service.registerProtectora(protectora);
            return ResponseEntity.status(HttpStatus.CREATED).body(protectora);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping
    public ResponseEntity<?> listProtectoras(){
        List<Protectora> protectoras = service.listarProtectoras();
        return ResponseEntity.ok(protectoras);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> listProtectoraporId(@PathVariable Long id) {
        Protectora protectora = service.listarProtectora(id).orElse(null);
        if (protectora == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Protectora no encontrada");

        }else {
            return ResponseEntity.ok(protectora);
        }
    }

	@PutMapping("/update/{usuarioId}")
	public ResponseEntity<Void> updateProtectora(@PathVariable Long usuarioId, @RequestBody ProtectoraDTO protectoraDTO) {
		service.updateProtectora(usuarioId, protectoraDTO);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/mascotas/{protectoraID}")
	public ResponseEntity<?> getMascotasByProtectoraID(@PathVariable Long protectoraID) {
		return ResponseEntity.ok().body(service.getMascotasByProtectoraID(protectoraID)) ;
	}

	@GetMapping("/user/{userId}")
	public ResponseEntity<?> getProtectoraByUserId(@PathVariable Long userId) {
		Protectora protectora = service.getProtectoraByUserId(userId);
		return ResponseEntity.ok(protectora);
	}

}
