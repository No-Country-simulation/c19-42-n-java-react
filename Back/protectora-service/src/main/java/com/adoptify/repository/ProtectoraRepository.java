package com.adoptify.repository;

import com.adoptify.model.Protectora;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProtectoraRepository extends JpaRepository<Protectora,Long> {
	Optional<Protectora> findByUsuarioId(Long usuarioId);

}
