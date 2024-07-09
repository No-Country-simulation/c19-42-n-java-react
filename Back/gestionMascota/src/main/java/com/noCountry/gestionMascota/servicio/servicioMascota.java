package com.noCountry.gestionMascota.servicio;

import com.noCountry.gestionMascota.entidades.mascotas;
import org.springframework.beans.factory.annotation.Autowired;
import com.noCountry.gestionMascota.repositorio.repoMascota;
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
    public void findMascota(Long id) {
        repoMascota.findById(id).orElse(null);
    }

    @Override
    public void editMascota(Long id, mascotas mascotas) {
        this.saveMascota(mascotas);
    }
}
