package com.noCountry.gestionmascotas.servicio;


import com.noCountry.gestionmascotas.entidades.mascotas;
import com.noCountry.gestionmascotas.entidades.tipoMascota;
import com.noCountry.gestionmascotas.entidades.vacunaInfo;
import org.springframework.beans.factory.annotation.Autowired;
import com.noCountry.gestionmascotas.repositorio.repoMascota;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class servicioMascota implements IservicioMascota {

    @Autowired
    private repoMascota repoMascota;

    @Override
    public List<mascotas> listarMascotas() {
        return repoMascota.findAll();
    }

    @Override
    public void saveMascota(mascotas mascotas) {

        repoMascota.save(mascotas);
    }

    @Override
    public void deleteMascota(Long id) {
        repoMascota.deleteById(id);
    }

    @Override
    public mascotas findMascota(Long id) {
        return repoMascota.findById(id).orElse(null);

    }

    @Override
    public void editMascota(Long id, mascotas mascotas) {
        this.saveMascota(mascotas);
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
        return repoMascota.findMascotaByedad(edad);
    }

    @Override
    public List<mascotas> findMascotasByRaza(String raza) {
        return repoMascota.findMascotaByRaza(raza);
    }

    @Override
    public List<mascotas> findMascotasByRazaAndEdad(String raza, Long edad) {
        return repoMascota.findMascotaByedadAndRaza(raza,edad);
    }

    @Override
    public List<mascotas> findMascotasByTipo(tipoMascota tipoMascota) {
        return repoMascota.findMascotaByTipo(tipoMascota);
    }
}
