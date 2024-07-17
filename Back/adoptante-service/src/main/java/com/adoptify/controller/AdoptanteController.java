package com.adoptify.controller;

import com.adoptify.model.Adoptante;
import com.adoptify.service.AdoptanteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/adoptante")
@CrossOrigin("*")
public class AdoptanteController {

    @Autowired
    private AdoptanteService adoptanteService;

    @PostMapping
    public ResponseEntity<Adoptante> registerAdoptante(@RequestBody Adoptante adoptante) {
        try {
            Adoptante createdAdoptante = adoptanteService.registerAdoptante(adoptante);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdAdoptante);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
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
}
