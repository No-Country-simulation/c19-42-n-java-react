package com.adopta.usuarioservice.service;

import com.adopta.usuarioservice.model.Rol;
import com.adopta.usuarioservice.repository.RolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RolService {

    @Autowired
    private RolRepository rolRepository;

    private List<Rol> getAllRoles() {
        return rolRepository.findAll();
    }

    private Rol getRolById(Long id) {
        return rolRepository.findById(id).orElse(null);
    }

    private Rol createRol(Rol rol) {
        return rolRepository.save(rol);
    }

    private Rol updateRol(Long id, Rol rol) {
        if (rolRepository.existsById(id)) {
            rol.setIdrol(id);
            return rolRepository.save(rol);
        }
        return null;
    }

    private void deleteRol(Long id) {
        rolRepository.deleteById(id);
    }
}
