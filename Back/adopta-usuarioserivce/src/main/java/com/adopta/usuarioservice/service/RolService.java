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

    public List<Rol> getAllRoles() {
        return rolRepository.findAll();
    }

    public Optional<Rol> getRolById(Long id) {
        return rolRepository.findById(id);
    }

    public Rol createRol(Rol rol) {
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
