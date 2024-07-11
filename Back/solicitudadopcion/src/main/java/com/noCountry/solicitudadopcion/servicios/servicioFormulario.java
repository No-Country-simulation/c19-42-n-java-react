package com.noCountry.solicitudadopcion.servicios;

import com.noCountry.solicitudadopcion.entidades.formEntidades;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.noCountry.solicitudadopcion.repositorio.repositorioFormulario;
import java.util.List;

@Service
public class servicioFormulario implements IServicioFormulario {

    @Autowired
    private repositorioFormulario formu;

    @Override
    public List<formEntidades> listarFormulario() {
        return formu.findAll();
    }

    @Override
    public void saveFormulario(formEntidades form) {
        formu.save(form);
    }

    @Override
    public void deleteFormulario(Long id) {
        formu.deleteById(id);
    }

    @Override
    public void editFormulario(Long id, formEntidades formEntidades) {
        this.saveFormulario(formEntidades);
    }

    @Override
    public void findFormulario(Long id) {
        formu.findById(id).orElse(null);
    }
}
