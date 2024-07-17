package com.noCountry.solicitudadopcion;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class SolicitudadopcionApplication {

	public static void main(String[] args) {
		SpringApplication.run(SolicitudadopcionApplication.class, args);
	}

}
