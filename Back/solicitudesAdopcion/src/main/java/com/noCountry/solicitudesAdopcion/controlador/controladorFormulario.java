package com.noCountry.solicitudesAdopcion.controlador;

import com.noCountry.solicitudesAdopcion.entidades.formEntidades;
import com.noCountry.solicitudesAdopcion.servicios.IServicioFormulario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/formulario")
public class controladorFormulario {

    @Autowired
    private IServicioFormulario formulario;

    @PostMapping("/crear")
    public String crearFormulario(@RequestBody formEntidades form){
        formulario.saveFormulario(form);
        return "formulario creado correctamente";
    }
    @GetMapping("/listar")
    public List<formEntidades> ListarFormularios(){
        return formulario.listarFormulario();
    }
    @PutMapping("/editar/{id}")
    public String editarForm(@PathVariable Long id, @RequestBody formEntidades form){
        formulario.editFormulario(id,form);
        return "Formulario editado correctamente";
    }
    @DeleteMapping("/eliminar/{id}")
    public String eliminarFormulario(@PathVariable Long id){
        formulario.deleteFormulario(id);
        return "formulario eliminado correctamente";
    }
}
