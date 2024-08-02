package com.adoptify.service;

import com.adoptify.model.Protectora;
import com.adoptify.repository.ProtectoraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProtectoraService {

    @Autowired
    private ProtectoraRepository repository;

    public Protectora registerProtectora(Protectora protectora){
        return repository.save(protectora);
    }

    public List<Protectora> listarProtectoras(){
        return repository.findAll();
    }

    public Optional<Protectora> listarProtectora(Long id){
        return repository.findById(id);
    }
}
