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
public class AdoptanteResponse {

	private Long id;

	private String nombres;

	private String apellidos;

	private int edad;

	private String direccion;

	private String email;

	private String celular;

	private Long usuarioId;
}
