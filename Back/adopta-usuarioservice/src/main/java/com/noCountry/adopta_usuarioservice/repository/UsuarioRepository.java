package com.noCountry.adopta_usuarioservice.repository;


import com.noCountry.adopta_usuarioservice.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

}
