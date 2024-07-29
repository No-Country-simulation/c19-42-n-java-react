package com.adoptify.dto;

import lombok.Data;

@Data
public class Mascota {
	private Long id;
	private String nombre;
	private String raza;
	private String tipoMascota;
	private Long peso;
	private String img;
	private String pelaje;
	private String sexo;
	private String nivelActividad;
	private Long protectoraID;
	private Long edad;
}
