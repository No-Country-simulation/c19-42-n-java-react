package com.noCountry.gestionmascotas.repositorio;

import com.noCountry.gestionmascotas.entidades.mascotas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface repoMascota extends JpaRepository<mascotas, Long> {

}