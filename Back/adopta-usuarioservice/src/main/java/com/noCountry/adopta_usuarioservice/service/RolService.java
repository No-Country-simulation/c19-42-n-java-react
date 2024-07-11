package com.noCountry.adopta_usuarioservice.service;

import com.noCountry.adopta_usuarioservice.model.Rol;
import com.noCountry.adopta_usuarioservice.repository.RolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RolService {

    @Autowired
    private RolRepository rolRepository;

    public List<Rol> getAllRoles() {
        return rolRepository.findAll();
    }

    public Rol getRolById(Long id) {
        return rolRepository.findById(id).orElse(null);
    }

    public Rol saveRol(Rol rol) {
        return rolRepository.save(rol);
    }

    public Rol updateRol(Long id, Rol rol) {
        if (rolRepository.existsById(id)) {
            rol.setIdrol(id);
            return rolRepository.save(rol);
        }
        return null;
    }

    public void deleteRol(Long id) {
        rolRepository.deleteById(id);
    }
}

