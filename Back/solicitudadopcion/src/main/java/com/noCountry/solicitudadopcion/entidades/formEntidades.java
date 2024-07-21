package com.noCountry.solicitudadopcion.entidades;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor @NoArgsConstructor
@Getter @Setter
public class formEntidades {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;
    private String nombreCompleto;
    private String direccion;
    private String telefono;
    private String correoElectronico;
    private String nombreMascota;
    private String tipoVivienda;
    private Boolean tieneJardin;
    private Boolean tieneOtrasMascotas;
    private String descripcionOtrasMascotas;
    private String comentarios;
}
