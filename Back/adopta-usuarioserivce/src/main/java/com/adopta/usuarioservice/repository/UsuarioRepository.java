package com.adopta.usuarioservice.repository;

import com.adopta.usuarioservice.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

}
