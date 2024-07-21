package com.adoptify.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Entity
@Getter
@Setter
@Table(name = "protectora")
public class Protectora {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String nombre;

    @NotBlank
    private String email;

    @NotBlank
    private String direccion;

    @NotBlank
    private String pais;

    @NotBlank
    private String provincia;

    @NotBlank
    private String ciudad;

    private int codigoPostal;

    @NotBlank
    private String celular;

    @Column(name = "usuario_id")
    private Long usuarioId;
}
