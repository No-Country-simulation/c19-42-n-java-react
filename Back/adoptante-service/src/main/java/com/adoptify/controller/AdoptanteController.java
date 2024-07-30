package com.adoptify.controller;

import com.adoptify.dto.AdoptanteDto;
import com.adoptify.model.Adoptante;
import com.adoptify.service.AdoptanteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/adoptante")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class AdoptanteController {

    @Autowired
    private AdoptanteService adoptanteService;

    @PostMapping
    public ResponseEntity<?> registerAdoptante(@RequestBody Adoptante adoptante) {
        try {
            Adoptante createdAdoptante = adoptanteService.registerAdoptante(adoptante);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdAdoptante);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
        }
    }

    @GetMapping
    public ResponseEntity<?> listarAdoptantes(){
        List<Adoptante> adoptantes = adoptanteService.listarAdoptantes();
        return ResponseEntity.ok(adoptantes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> listarAdoptanteporId(@PathVariable Long id) {
        Adoptante adoptante = adoptanteService.listarAdoptante(id).orElse(null);
        if (adoptante == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Adoptante no encontrado");

        }else {
            return ResponseEntity.ok(adoptante);
        }
    }

	@PutMapping("/update/{usuarioId}")
	public ResponseEntity<Void> updateAdoptante(@PathVariable Long usuarioId, @RequestBody AdoptanteDto adoptanteDTO) {
		adoptanteService.updateAdoptante(usuarioId, adoptanteDTO);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/user/{userId}")
	public ResponseEntity<?> getAdoptanteByUserId(@PathVariable Long userId) {
		Adoptante adoptante = adoptanteService.getAdoptanteByUserId(userId);
		return ResponseEntity.ok(adoptante);
	}
}
