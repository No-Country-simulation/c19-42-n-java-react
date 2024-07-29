package com.noCountry.gestionmascotas.servicio;

import com.noCountry.gestionmascotas.entidades.mascotas;
import com.noCountry.gestionmascotas.entidades.tipoMascota;
import com.noCountry.gestionmascotas.entidades.vacunaInfo;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IservicioMascota {
    public List<mascotas> listarMascotas();
	public String saveMascota(mascotas mascotas, MultipartFile img) throws IOException;
    public void deleteMascota(Long id);
    public mascotas findMascota(Long id);
    public void editMascota(Long id, mascotas updatedMascota, MultipartFile imgFile) throws IOException;
    public mascotas addVacuna(Long id, vacunaInfo vacunaInfo);
    public List<mascotas> findMascotaByEdad(Long edad);
    public List<mascotas> findMascotasByRaza(String raza);
    public List<mascotas> findMascotasByRazaAndEdad(String raza, Long edad);
    public List<mascotas> findMascotasByTipo(tipoMascota tipoMascota);

	public List<mascotas> getLastThreeMascotas();

	List<mascotas> findMascotasByProtectoraID(Long protectoraID);

}
