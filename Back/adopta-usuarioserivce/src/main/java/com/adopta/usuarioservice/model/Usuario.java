package com.adopta.usuarioservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombres;
    private String apellidos;
    private int edad;
    private String dirección;
    private String email;
    private Long celular;
    private String username;
    private String password;

    @ManyToOne
    @JoinColumn(name = "idrol")
    @JsonIgnore
    private Rol rol;
}
