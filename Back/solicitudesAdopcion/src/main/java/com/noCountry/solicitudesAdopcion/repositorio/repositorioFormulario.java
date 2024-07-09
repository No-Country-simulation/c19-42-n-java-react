package com.noCountry.solicitudesAdopcion.repositorio;
import com.noCountry.solicitudesAdopcion.entidades.formEntidades;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface repositorioFormulario extends JpaRepository<formEntidades, Long> {

}
