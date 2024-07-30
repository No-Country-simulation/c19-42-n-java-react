package com.adoptify.feign;

import com.adoptify.dto.AdoptanteProfileRequest;
import com.adoptify.dto.AdoptanteResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "ADOPTANTE-SERVICE")
public interface AdoptanteClient {
    @PostMapping("/adoptante")
    void createAdoptanteProfile(@RequestBody AdoptanteProfileRequest request);

	@GetMapping("/adoptante/user/{userId}")
	ResponseEntity<AdoptanteResponse> getAdoptanteByUserId(@PathVariable Long userId);
}
