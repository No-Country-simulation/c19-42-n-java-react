package com.adoptify.controller;

import com.adoptify.model.Protectora;
import com.adoptify.service.ProtectoraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/protectora")
@CrossOrigin("http://localhost:4200")
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
}
