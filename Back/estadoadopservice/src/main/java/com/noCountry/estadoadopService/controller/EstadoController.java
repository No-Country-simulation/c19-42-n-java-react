package com.noCountry.estadoadopService.controller;

import com.noCountry.estadoadopService.model.EstadoAdopcion;
import com.noCountry.estadoadopService.service.EstadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/estadoadopcion")
@CrossOrigin("*")
public class EstadoController {

    @Autowired
    private EstadoService service;

    @GetMapping("/listar")
    public ResponseEntity<?> listarEstados() {
        return ResponseEntity.ok(service.getAllEstados());
    }

    @GetMapping("/listar/{id}")
    public ResponseEntity<?> listarEstadoporId(@PathVariable Long id){
        EstadoAdopcion estadoAdopcion = service.getEstadosById(id);
        if (estadoAdopcion != null){
            return ResponseEntity.ok(estadoAdopcion);
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/guardar")
    public ResponseEntity<?> guardarEstado(@RequestBody EstadoAdopcion estadoAdopcion){
        return ResponseEntity.ok(service.saveEstado(estadoAdopcion));
    }

    @PutMapping("/modificar/{id}")
    public ResponseEntity<?> modificarEstado(@RequestBody EstadoAdopcion estadoAdopcion, @PathVariable Long id){
        EstadoAdopcion estadoAdopcion1 = service.getEstadosById(id);
        if (estadoAdopcion1 != null){
            return ResponseEntity.ok(service.updateEstado(id, estadoAdopcion));
        }else {
            return ResponseEntity.badRequest().body("No se encontro el id del Estado de adopcion");
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarEstado(@PathVariable Long id){
        EstadoAdopcion estadoAdopcion = service.getEstadosById(id);
        if (estadoAdopcion != null){
            service.deleteEstado(id);
            return ResponseEntity.ok().body("{\"message\": \"Estado adopcion Eliminado exitosamente\"}");
        }else {
            return ResponseEntity.badRequest().body("No se encontro el id del estado de adopcion");
        }
    }
}
