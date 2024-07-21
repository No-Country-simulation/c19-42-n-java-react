package com.noCountry.estadoadopService.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Table
@Entity
public class EstadoAdopcion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Estado estado;

    private String comentario;
}