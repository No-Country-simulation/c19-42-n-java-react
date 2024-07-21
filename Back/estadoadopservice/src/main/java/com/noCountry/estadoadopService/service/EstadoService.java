package com.noCountry.estadoadopService.service;

import com.noCountry.estadoadopService.model.EstadoAdopcion;
import com.noCountry.estadoadopService.repository.EstadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EstadoService {

    @Autowired
    private EstadoRepository repository;

    public List<EstadoAdopcion> getAllEstados(){
        return repository.findAll();
    }

    public EstadoAdopcion getEstadosById(Long id){
        return repository.findById(id).orElse(null);
    }

    public EstadoAdopcion saveEstado(EstadoAdopcion estadoAdopcion){
        return repository.save(estadoAdopcion);
    }

    public EstadoAdopcion updateEstado(Long id,EstadoAdopcion estadoAdopcion){
        if (repository.existsById(id)){
            estadoAdopcion.setId(id);
            return repository.save(estadoAdopcion);
        }
        return null;
    }

    public void deleteEstado(Long id){
        repository.deleteById(id);
    }

}
