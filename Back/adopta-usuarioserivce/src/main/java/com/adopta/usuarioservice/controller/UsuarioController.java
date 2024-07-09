package com.adopta.usuarioservice.controller;

import com.adopta.usuarioservice.model.Usuario;
import com.adopta.usuarioservice.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/usuario")
@CrossOrigin("*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/listar")
    public ResponseEntity<?> listarUsuarios() {
        return ResponseEntity.ok(usuarioService.getAllUsuarios());
    }

    @GetMapping("/listar/{id}")
    public ResponseEntity<?> listaUsuarioporId(@PathVariable Long id){
        Usuario usuario = usuarioService.getUsuarioById(id);
        if (usuario != null){
            return ResponseEntity.ok(usuario);
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/guardar")
    public ResponseEntity<?> guardarUsuario(@RequestBody Usuario usuario){
        return ResponseEntity.ok(usuarioService.saveUsuario(usuario));
    }

    @PutMapping("/modificar/{id}")
    public ResponseEntity<?> modificarUsuario(@RequestBody Usuario usuario, @PathVariable Long id){
        Usuario usuario1 = usuarioService.getUsuarioById(id);
        if (usuario1 != null){
            return ResponseEntity.ok(usuarioService.updateUsuario(id, usuario));
        }else {
            return ResponseEntity.badRequest().body("No se encontro el id del usuario");
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarUsuario(@PathVariable Long id){
        Usuario usuario = usuarioService.getUsuarioById(id);
        if (usuario != null){
            usuarioService.deleteUsuario(id);
            return ResponseEntity.ok().body("{\"message\": \"Usuario Eliminado exitosamente\"}");
        }else {
            return ResponseEntity.badRequest().body("No se encontro el id del usuario");
        }
    }
}
