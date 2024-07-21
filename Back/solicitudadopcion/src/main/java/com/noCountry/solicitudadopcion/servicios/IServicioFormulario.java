package com.noCountry.solicitudadopcion.servicios;

import com.noCountry.solicitudadopcion.entidades.formEntidades;

import java.util.List;

public interface IServicioFormulario {

    public List<formEntidades> listarFormulario();
    public void saveFormulario(formEntidades form);
    public void deleteFormulario(Long id);
    public void editFormulario(Long id, formEntidades formEntidades);
    public void findFormulario(Long id);
}