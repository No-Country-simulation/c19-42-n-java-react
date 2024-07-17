package com.adoptify.service;

import com.adoptify.model.Adoptante;
import com.adoptify.repository.AdoptanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdoptanteService {

    @Autowired
    private AdoptanteRepository adoptanteRepository;

    public Adoptante registerAdoptante(Adoptante adoptante) {
        return adoptanteRepository.save(adoptante);
    }

    public List<Adoptante> listarAdoptantes(){
        return adoptanteRepository.findAll();
    }

    public Optional<Adoptante> listarAdoptante(Long id){
        return adoptanteRepository.findById(id);
    }
}
