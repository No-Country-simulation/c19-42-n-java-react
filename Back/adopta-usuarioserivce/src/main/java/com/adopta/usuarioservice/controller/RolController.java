package com.adopta.usuarioservice.controller;

import com.adopta.usuarioservice.model.Rol;
import com.adopta.usuarioservice.service.RolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rol")
@CrossOrigin("*")
public class RolController {

    @Autowired
    private RolService rolService;

    @GetMapping("/listar")
    public ResponseEntity<?> listarRoles() {
        return ResponseEntity.ok(rolService.getAllRoles());
    }

    @GetMapping("/listar/{id]")
    public ResponseEntity<?> listarRolporId(@PathVariable Long id){
        Rol rol = rolService.getRolById(id);
        if (rol != null){
            return ResponseEntity.ok(rol);
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/guardar")
    public ResponseEntity<?> guardarRol(@RequestBody Rol rol){
        return ResponseEntity.ok(rolService.saveRol(rol));
    }

    @PutMapping("/modificar/{id}")
    public ResponseEntity<?> modificarUsuario(@RequestBody Rol rol, @PathVariable Long id){
        Rol rol1 = rolService.getRolById(id);
        if (rol1 != null){
            return ResponseEntity.ok(rolService.updateRol(id, rol));
        }else {
            return ResponseEntity.badRequest().body("No se encontro el id del usuario");
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarUsuario(@PathVariable Long id){
        Rol rol = rolService.getRolById(id);
        if (rol != null){
            rolService.deleteRol(id);
            return ResponseEntity.ok().body("{\"message\": \"Rol Eliminado exitosamente\"}");
        }else {
            return ResponseEntity.badRequest().body("No se encontro el id del rol");
        }
    }
}
