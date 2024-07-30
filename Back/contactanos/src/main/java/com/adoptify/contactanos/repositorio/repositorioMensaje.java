package com.adoptify.contactanos.repositorio;

import com.adoptify.contactanos.entidades.EmailDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface repositorioMensaje extends JpaRepository<EmailDTO, Long> {
}
