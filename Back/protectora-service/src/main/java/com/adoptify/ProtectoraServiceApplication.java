package com.adoptify;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
@EnableDiscoveryClient
public class ProtectoraServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProtectoraServiceApplication.class, args);
	}

}