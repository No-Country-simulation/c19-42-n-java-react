package com.noCountry.gestionMascota.controlador;

import com.noCountry.gestionMascota.servicio.IservicioMascota;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.noCountry.gestionMascota.entidades.mascotas;

import java.util.List;

@RestController
@RequestMapping("/mascota")
public class controladorMascota {

    @Autowired
    private IservicioMascota servMascota;

    @PostMapping("/crear")
    public String crearMascota(@RequestBody mascotas masco){
        servMascota.saveMascota(masco);
        return "la mascota se creó con éxito";
    }

    @GetMapping("/listar")
    public List<mascotas> lsitarMascotas(){
        return  servMascota.listarMascotas();
    }

    @PutMapping("/editar/{id}")
    public String editarMascota(@PathVariable Long id, @RequestBody mascotas masco){
        servMascota.editMascota(id, masco);
        return "Mascota editada correctamente";

    }
    @DeleteMapping("/delete/{id}")
    public String eliminarMascota(@PathVariable Long id){
        servMascota.deleteMascota(id);
        return "Mascota eliminada correctamente";
    }

}
