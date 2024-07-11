package com.noCountry.gestionmascotas.servicio;

import com.noCountry.gestionmascotas.entidades.mascotas;

import java.util.List;

public interface IservicioMascota {
    public List<mascotas> listarMascotas();
    public void saveMascota(mascotas mascotas);
    public void deleteMascota(Long id);
    public void findMascota(Long id);
    public void editMascota(Long id, mascotas mascotas);

}