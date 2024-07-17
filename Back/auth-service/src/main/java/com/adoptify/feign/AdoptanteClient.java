package com.adoptify.feign;

import com.adoptify.dto.AdoptanteProfileRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "ADOPTANTE-SERVICE")
public interface AdoptanteClient {
    @PostMapping("/adoptante")
    void createAdoptanteProfile(@RequestBody AdoptanteProfileRequest request);
}
