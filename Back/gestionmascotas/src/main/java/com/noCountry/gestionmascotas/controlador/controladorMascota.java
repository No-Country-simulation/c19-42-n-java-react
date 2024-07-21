package com.noCountry.gestionmascotas.controlador;

import com.noCountry.gestionmascotas.entidades.tipoMascota;
import com.noCountry.gestionmascotas.servicio.IservicioMascota;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.noCountry.gestionmascotas.entidades.mascotas;
import com.noCountry.gestionmascotas.entidades.vacunaInfo;
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

    @PostMapping("/vacunas/{mascotaId}")
    public mascotas addVacuna(@PathVariable Long mascotaId, @RequestBody vacunaInfo vacunaInfo){
        return servMascota.addVacuna(mascotaId, vacunaInfo);
    }

    @GetMapping("/raza/{raza}")
    public List<mascotas> listarMascotaPorRaza(@PathVariable String raza){
        return servMascota.findMascotasByRaza(raza);
    }
    @GetMapping("/edad/{edad}")
    public List<mascotas> listarMascotasPorEdad(@PathVariable Long edad){
        return servMascota.findMascotaByEdad(edad);
    }
    @GetMapping("/raza/{raza}/edad/{edad}")
    public List<mascotas> listarMascotasPorEdadYRaza(@PathVariable String raza, @PathVariable Long edad){
        return servMascota.findMascotasByRazaAndEdad(raza, edad);
    }
    @GetMapping("/tipo/{tipoMascota}")
    public List<mascotas> listarMascotasPorTipo(@PathVariable tipoMascota tipoMascota){
        return servMascota.findMascotasByTipo(tipoMascota);
    }
}