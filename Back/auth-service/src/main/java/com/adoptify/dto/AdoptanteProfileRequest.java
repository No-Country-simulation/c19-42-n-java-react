package com.adoptify.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdoptanteProfileRequest {

    private String nombres;
    private String apellidos;
    private int edad;
    private String direccion;
    private String email;
    private String celular;
    private Long usuarioId;
    private String username;
    private String password;
}
