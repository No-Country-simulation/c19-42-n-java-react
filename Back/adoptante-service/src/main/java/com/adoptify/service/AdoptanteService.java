package com.adoptify.service;

import com.adoptify.model.Adoptante;
import com.adoptify.repository.AdoptanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdoptanteService {

    @Autowired
    private AdoptanteRepository adoptanteRepository;

    public Adoptante registerAdoptante(Adoptante adoptante) {
        return adoptanteRepository.save(adoptante);
    }
}
