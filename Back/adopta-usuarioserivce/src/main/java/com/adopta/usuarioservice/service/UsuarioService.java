package com.adopta.usuarioservice.service;

import com.adopta.usuarioservice.model.Usuario;
import com.adopta.usuarioservice.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    UsuarioRepository usuarioRepository;

    public Usuario saveUsuario(Usuario usuario){
        return usuarioRepository.save(usuario);
    }

    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> getUsuarioById(Long id) {
        return usuarioRepository.findById(id);
    }
    public Usuario updateUsuario(Long id, Usuario usuario) {
        if (usuarioRepository.existsById(id)){
            usuario.setId(id);
            return usuarioRepository.save(usuario);
        }
        return null;
    }
    public void deleteUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }
}
