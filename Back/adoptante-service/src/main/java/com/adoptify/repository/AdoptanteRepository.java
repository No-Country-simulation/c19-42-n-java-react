package com.adoptify.repository;

import com.adoptify.model.Adoptante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdoptanteRepository extends JpaRepository<Adoptante, Long> {
	Optional<Adoptante> findByUsuarioId(Long usuarioId);


}
