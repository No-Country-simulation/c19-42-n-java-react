package com.adoptify.controller;

import com.adoptify.model.Adoptante;
import com.adoptify.service.AdoptanteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/adoptante")
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
}
