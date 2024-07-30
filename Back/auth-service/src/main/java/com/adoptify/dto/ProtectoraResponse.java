package com.adoptify.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProtectoraResponse {

	private Long id;

	private String nombre;

	private String email;

	private String direccion;

	private String pais;

	private String provincia;

	private String ciudad;

	private int codigoPostal;

	private String celular;

	private Long usuarioId;

}
