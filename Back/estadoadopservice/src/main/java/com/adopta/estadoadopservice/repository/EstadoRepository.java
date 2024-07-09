package com.adopta.estadoadopservice.repository;

import com.adopta.estadoadopservice.model.EstadoAdopcion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstadoRepository extends JpaRepository<EstadoAdopcion,Long> {

}
