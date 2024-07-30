package com.adoptify.feign;

import com.adoptify.dto.ProtectoraProfileRequest;
import com.adoptify.dto.ProtectoraResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "PROTECTORA-SERVICE")
public interface ProtectoraClient {

    @PostMapping("/protectora")
    void createProtectoraProfile(@RequestBody ProtectoraProfileRequest request);

	@GetMapping("/protectora/user/{userId}")
	ResponseEntity<ProtectoraResponse> getProtectoraByUserId(@PathVariable Long userId);

}
