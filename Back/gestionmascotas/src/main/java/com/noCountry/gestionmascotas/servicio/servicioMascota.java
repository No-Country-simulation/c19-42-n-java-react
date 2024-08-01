package com.noCountry.gestionmascotas.servicio;


import com.noCountry.gestionmascotas.entidades.mascotas;
import com.noCountry.gestionmascotas.entidades.tipoMascota;
import com.noCountry.gestionmascotas.entidades.vacunaInfo;
import jakarta.ws.rs.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import com.noCountry.gestionmascotas.repositorio.repoMascota;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class servicioMascota implements IservicioMascota {

    @Autowired
    private repoMascota repoMascota;

    @Override
    public List<mascotas> listarMascotas() {
		List<mascotas> mascotasList = repoMascota.findAll();
		for (mascotas mascota : mascotasList) {
			if (mascota.getImg() != null) {
				mascota.setImg("data:image/jpeg;base64," + mascota.getImg());
				System.out.println("Imagen obtenida correctamente");
			}
		}
        return mascotasList;
    }

    @Override
	public String saveMascota(mascotas mascota, MultipartFile imgFile) throws IOException{
		// Codificar la imagen en base64 antes de guardar
		if (imgFile != null && !imgFile.isEmpty()) {
			String base64Img = Base64.getEncoder().encodeToString(imgFile.getBytes());
			mascota.setImg(base64Img);
			System.out.println("Imagen codificada en base64: " + base64Img);
		}
		repoMascota.save(mascota);
		return null;
	}

    @Override
    public void deleteMascota(Long id) {
        repoMascota.deleteById(id);
    }

    @Override
    public mascotas findMascota(Long id) {
		mascotas mascota = repoMascota.findById(id).orElse(null);
		if (mascota != null) {
			if (mascota.getImg() != null) {
				mascota.setImg("data:image/jpeg;base64," + mascota.getImg());
				System.out.println("Imagen obtenida correctamente");
			}
		}
		return mascota;
    }

    @Override
	public void editMascota(Long id, mascotas updatedMascota, MultipartFile imgFile) throws IOException {
		Optional<mascotas> optionalMascota = repoMascota.findById(id);

		if (optionalMascota.isPresent()) {
			mascotas existingMascota = optionalMascota.get();

			// Actualizar los campos de la mascota existente con los valores del updatedMascota
			existingMascota.setNombre(updatedMascota.getNombre());
			existingMascota.setRaza(updatedMascota.getRaza());
			existingMascota.setTipoMascota(updatedMascota.getTipoMascota());
			existingMascota.setPeso(updatedMascota.getPeso());
			existingMascota.setPelaje(updatedMascota.getPelaje());
			existingMascota.setSexo(updatedMascota.getSexo());
			existingMascota.setNivelActividad(updatedMascota.getNivelActividad());
			existingMascota.setProtectoraID(updatedMascota.getProtectoraID());
			existingMascota.setEdad(updatedMascota.getEdad());

			// Codificar la nueva imagen en base64 si se proporciona una nueva imagen
			if (imgFile != null && !imgFile.isEmpty()) {
				String base64Img = Base64.getEncoder().encodeToString(imgFile.getBytes());
				existingMascota.setImg(base64Img);
			}

			repoMascota.save(existingMascota);
		} else {
		}
	}

    @Override
    public mascotas addVacuna(Long id, vacunaInfo vacunaInfo) {
        mascotas mascota = findMascota(id);
        if (mascota != null) {
            mascota.getVacunas().add(vacunaInfo);
            repoMascota.save(mascota);
        }
        return mascota;
    }

    @Override
    public List<mascotas> findMascotaByEdad(Long edad) {
		List<mascotas> mascotasList = repoMascota.findMascotaByedad(edad);
		for (mascotas mascota : mascotasList) {
			if (mascota.getImg() != null) {
				mascota.setImg("data:image/jpeg;base64," + mascota.getImg());
				System.out.println("Imagen obtenida correctamente");
			}
		}
		return mascotasList;
    }

    @Override
    public List<mascotas> findMascotasByRaza(String raza) {
		List<mascotas> mascotasList = repoMascota.findMascotaByRaza(raza);
		for (mascotas mascota : mascotasList) {
			if (mascota.getImg() != null) {
				mascota.setImg("data:image/jpeg;base64," + mascota.getImg());
				System.out.println("Imagen obtenida correctamente");
			}
		}
		return mascotasList;
    }

    @Override
    public List<mascotas> findMascotasByRazaAndEdad(String raza, Long edad) {
		List<mascotas> mascotasList = repoMascota.findMascotaByedadAndRaza(raza, edad);
		for (mascotas mascota : mascotasList) {
			if (mascota.getImg() != null) {
				mascota.setImg("data:image/jpeg;base64," + mascota.getImg());
				System.out.println("Imagen obtenida correctamente");
			}
		}
		return mascotasList;
    }

    @Override
    public List<mascotas> findMascotasByTipo(tipoMascota tipoMascota) {
		List<mascotas> mascotasList = repoMascota.findMascotaByTipo(tipoMascota);
		for (mascotas mascota : mascotasList) {
			if (mascota.getImg() != null) {
				mascota.setImg("data:image/jpeg;base64," + mascota.getImg());
				System.out.println("Imagen obtenida correctamente");
			}
		}
		return mascotasList;
    }

	@Override
	public List<mascotas> findMascotasByProtectoraID(Long protectoraID) {
		List<mascotas> mascotasList = repoMascota.findByProtectoraID(protectoraID);
		for (mascotas mascota : mascotasList) {
			if (mascota.getImg() != null) {
				mascota.setImg("data:image/jpeg;base64," + mascota.getImg());
				System.out.println("Imagen obtenida correctamente");
			}
		}
		return mascotasList;
	}

	@Override
	public List<mascotas> getLastThreeMascotas() {
		List<mascotas> mascotasList = repoMascota.findTop3ByOrderByIdDesc();
		for (mascotas mascota : mascotasList) {
			if (mascota.getImg() != null) {
				mascota.setImg("data:image/jpeg;base64," + mascota.getImg());
				System.out.println("Imagen obtenida correctamente");
			}
		}
		return mascotasList;
	}
}
