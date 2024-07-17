package com.adoptify.repository;

import com.adoptify.model.Protectora;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProtectoraRepository extends JpaRepository<Protectora,Long> {
}
