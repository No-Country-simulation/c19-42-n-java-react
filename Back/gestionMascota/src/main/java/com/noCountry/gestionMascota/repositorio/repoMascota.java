package com.noCountry.gestionMascota.repositorio;

import com.noCountry.gestionMascota.entidades.mascotas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface repoMascota extends JpaRepository<mascotas, Long> {

}
