package com.noCountry.gestionmascotas.entidades;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor @NoArgsConstructor
@Setter @Getter
@Data
public class mascotas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String nombre;
    String raza;
    @Enumerated(EnumType.STRING)
    tipoMascota tipoMascota;
    Long peso;
	@Column(columnDefinition = "LONGTEXT")
	private String img;
    String pelaje;
    String sexo;
    @Enumerated(EnumType.STRING)
    nivelActividad nivelActividad;
    Long protectoraID;
    Long edad;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "mascota_id")
    private List<vacunaInfo> vacunas = new ArrayList<>();
}
