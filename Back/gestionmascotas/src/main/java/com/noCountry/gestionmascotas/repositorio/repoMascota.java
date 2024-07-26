package com.noCountry.gestionmascotas.repositorio;

import com.noCountry.gestionmascotas.entidades.mascotas;
import com.noCountry.gestionmascotas.entidades.tipoMascota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface repoMascota extends JpaRepository<mascotas, Long> {

	List<mascotas> findByProtectoraID(Long protectoraID);

	@Query ("SELECT m FROM mascotas m WHERE m.raza= :raza")
    List <mascotas> findMascotaByRaza(String raza);

    @Query ("SELECT e FROM mascotas e WHERE e.edad= :edad")
    List <mascotas> findMascotaByedad(Long edad);

    @Query ("SELECT me FROM mascotas me WHERE me.raza= :raza and me.edad = :edad")
    List<mascotas> findMascotaByedadAndRaza(String raza, Long edad);

    @Query ("SELECT tm FROM mascotas tm WHERE tm.tipoMascota= :tipoMascota")
    List <mascotas> findMascotaByTipo(tipoMascota tipoMascota);

	@Query(value = "SELECT * FROM mascotas ORDER BY id DESC LIMIT 3", nativeQuery = true)
	List<mascotas> findTop3ByOrderByIdDesc();
}
