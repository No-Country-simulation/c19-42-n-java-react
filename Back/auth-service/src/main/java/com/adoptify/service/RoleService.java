package com.adoptify.service;

import com.adoptify.model.Role;
import com.adoptify.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService {

    @Autowired
    private RoleRepository rolRepository;

    public List<Role> getAllRoles() {
        return rolRepository.findAll();
    }

    public Optional<Role> getRolById(Long id) {
        return rolRepository.findById(id);
    }

    public Role createRol(Role rol) {
        return rolRepository.save(rol);
    }

    public Role updateRol(Long id, Role rol) {
        if (rolRepository.existsById(id)) {
            rol.setId(id);
            return rolRepository.save(rol);
        }
        return null;
    }

    public void deleteRol(Long id) {
        rolRepository.deleteById(id);
    }
}
