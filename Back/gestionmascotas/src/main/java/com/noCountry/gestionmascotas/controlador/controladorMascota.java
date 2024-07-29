package com.noCountry.gestionmascotas.controlador;

import com.noCountry.gestionmascotas.entidades.nivelActividad;
import com.noCountry.gestionmascotas.entidades.tipoMascota;
import com.noCountry.gestionmascotas.servicio.IservicioMascota;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.noCountry.gestionmascotas.entidades.mascotas;
import com.noCountry.gestionmascotas.entidades.vacunaInfo;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/mascota")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class controladorMascota {

    @Autowired
    private IservicioMascota servMascota;

	@PostMapping("/crear")
	public ResponseEntity<?> crearMascota(@RequestParam("nombre") String nombre,
									   @RequestParam("raza") String raza,
									   @RequestParam("tipoMascota") tipoMascota tipoMascota,
									   @RequestParam("peso") Long peso,
									   @RequestParam("img") MultipartFile img,
									   @RequestParam("pelaje") String pelaje,
									   @RequestParam("sexo") String sexo,
									   @RequestParam("nivelActividad") nivelActividad nivelActividad,
									   @RequestParam("protectoraID") Long protectoraID,
									   @RequestParam("edad") Long edad) throws IOException {

		mascotas mascota = new mascotas();
		mascota.setNombre(nombre);
		mascota.setRaza(raza);
		mascota.setTipoMascota(tipoMascota);
		mascota.setPeso(peso);
		mascota.setPelaje(pelaje);
		mascota.setSexo(sexo);
		mascota.setNivelActividad(nivelActividad);
		mascota.setProtectoraID(protectoraID);
		mascota.setEdad(edad);

		servMascota.saveMascota(mascota, img);
		return ResponseEntity.ok().body(Collections.singletonMap("message", "la mascota se creó con éxito"));
	}

    @GetMapping("/listar")
    public ResponseEntity<?>lsitarMascotas(){
        return ResponseEntity.ok().body(servMascota.listarMascotas()) ;
    }

	@GetMapping("/listar/{id}")
	public ResponseEntity<?> listarMascotaId(@PathVariable Long id) {
		return ResponseEntity.ok().body(servMascota.findMascota(id));
	}

	@PutMapping("/editar/{id}")
	public ResponseEntity<?> editarMascota(@PathVariable Long id,
								@RequestParam("nombre") String nombre,
								@RequestParam("raza") String raza,
								@RequestParam("tipoMascota") tipoMascota tipoMascota,
								@RequestParam("peso") Long peso,
								@RequestParam(value = "img", required = false) MultipartFile img,
								@RequestParam("pelaje") String pelaje,
								@RequestParam("sexo") String sexo,
								@RequestParam("nivelActividad") nivelActividad nivelActividad,
								@RequestParam("protectoraID") Long protectoraID,
								@RequestParam("edad") Long edad) throws IOException {

		mascotas mascota = new mascotas();
		mascota.setNombre(nombre);
		mascota.setRaza(raza);
		mascota.setTipoMascota(tipoMascota);
		mascota.setPeso(peso);
		mascota.setPelaje(pelaje);
		mascota.setSexo(sexo);
		mascota.setNivelActividad(nivelActividad);
		mascota.setProtectoraID(protectoraID);
		mascota.setEdad(edad);

		servMascota.editMascota(id, mascota, img);
		return ResponseEntity.ok().body("Mascota editada correctamente");
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Object> eliminarMascota(@PathVariable Long id){
		servMascota.deleteMascota(id);
		Map<String, String> response = new HashMap<>();
		response.put("message", "Mascota eliminada correctamente");
		return ResponseEntity.ok().body(response);
		//servMascota.deleteMascota(id);
		//return ResponseEntity.ok().body("Mascota eliminada correctamente");
	}

    @PostMapping("/vacunas/{mascotaId}")
    public ResponseEntity<?> addVacuna(@PathVariable Long mascotaId, @RequestBody vacunaInfo vacunaInfo){
        return ResponseEntity.ok().body(servMascota.addVacuna(mascotaId, vacunaInfo));
    }

    @GetMapping("/raza/{raza}")
    public ResponseEntity<?> listarMascotaPorRaza(@PathVariable String raza){
        return ResponseEntity.ok().body(servMascota.findMascotasByRaza(raza));
    }
    @GetMapping("/edad/{edad}")
    public ResponseEntity<?> listarMascotasPorEdad(@PathVariable Long edad){
        return ResponseEntity.ok().body(servMascota.findMascotaByEdad(edad));
    }
    @GetMapping("/raza/{raza}/edad/{edad}")
    public ResponseEntity<?> listarMascotasPorEdadYRaza(@PathVariable String raza, @PathVariable Long edad){
        return ResponseEntity.ok().body( servMascota.findMascotasByRazaAndEdad(raza, edad));
    }
    @GetMapping("/tipo/{tipoMascota}")
    public ResponseEntity<?> listarMascotasPorTipo(@PathVariable tipoMascota tipoMascota){
        return ResponseEntity.ok().body(servMascota.findMascotasByTipo(tipoMascota));
    }

	@GetMapping("/buscarPorProtectoraID/{protectoraID}")
	public ResponseEntity<?> buscarMascotasPorProtectoraID(@PathVariable Long protectoraID) {
		return ResponseEntity.ok().body(servMascota.findMascotasByProtectoraID(protectoraID));
	}

	@GetMapping("/ultimas")
	public ResponseEntity<?> obtenerUltimasTresMascotas() {
		return ResponseEntity.ok().body(servMascota.getLastThreeMascotas());
	}
}
