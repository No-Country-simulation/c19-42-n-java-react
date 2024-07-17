package com.noCountry.estadoadopService.repository;
import  com.noCountry.estadoadopService.model.EstadoAdopcion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstadoRepository extends JpaRepository<EstadoAdopcion,Long> {

}
