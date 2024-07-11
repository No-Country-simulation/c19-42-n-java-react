package com.noCountry.solicitudadopcion.repositorio;

import com.noCountry.solicitudadopcion.entidades.formEntidades;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface repositorioFormulario extends JpaRepository<formEntidades, Long> {

}
