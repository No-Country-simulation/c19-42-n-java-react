package com.adoptify.contactanos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
@EnableDiscoveryClient
//(exclude = {DataSourceAutoConfiguration.class })
public class ContactanosApplication {

	public static void main(String[] args) {
		SpringApplication.run(ContactanosApplication.class, args);
	}

}
