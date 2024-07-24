package com.adoptify.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProtectoraProfileRequest {

    private String nombre;
    private String email;
    private String direccion;
    private String pais;
    private String provincia;
    private String ciudad;
    private int codigoPostal;
    private String celular;
	private Long usuarioId;
	private String username;
    private String password;
}
