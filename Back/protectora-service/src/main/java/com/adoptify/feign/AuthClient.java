package com.adoptify.feign;

import com.adoptify.dto.UserDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "auth-service")
public interface AuthClient {

	@GetMapping("/auth/user/{id}")
	UserDTO getUserById(@PathVariable("id") Long id);

	@PutMapping("/auth/user/{id}")
	void updateUser(@PathVariable("id") Long id, @RequestBody UserDTO userDTO);

}
