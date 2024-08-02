package com.adoptify.feign;

import com.adoptify.dto.ProtectoraProfileRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "PROTECTORA-SERVICE")
public interface ProtectoraClient {

    @PostMapping("/protectora")
    void createProtectoraProfile(@RequestBody ProtectoraProfileRequest request);
}
