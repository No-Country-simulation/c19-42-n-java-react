package com.noCountry.gestionmascotas.servicio;

import com.noCountry.gestionmascotas.entidades.mascotas;
import com.noCountry.gestionmascotas.entidades.tipoMascota;
import com.noCountry.gestionmascotas.entidades.vacunaInfo;

import java.util.List;

public interface IservicioMascota {
    public List<mascotas> listarMascotas();
    public void saveMascota(mascotas mascotas);
    public void deleteMascota(Long id);
    public mascotas findMascota(Long id);
    public void editMascota(Long id, mascotas mascotas);
    public mascotas addVacuna(Long id, vacunaInfo vacunaInfo);
    public List<mascotas> findMascotaByEdad(Long edad);
    public List<mascotas> findMascotasByRaza(String raza);
    public List<mascotas> findMascotasByRazaAndEdad(String raza, Long edad);
    public List<mascotas> findMascotasByTipo(tipoMascota tipoMascota);

}