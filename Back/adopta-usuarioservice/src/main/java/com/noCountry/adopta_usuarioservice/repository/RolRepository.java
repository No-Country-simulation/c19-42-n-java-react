package com.noCountry.adopta_usuarioservice.repository;

import com.noCountry.adopta_usuarioservice.model.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolRepository extends JpaRepository<Rol, Long> {
}

