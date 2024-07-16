package com.adoptify.feign;

import com.adoptify.dto.ProtectoraProfileRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "protectora-service")
public interface ProtectoraClient {
    @PostMapping("/api/protectora")
    void createProtectoraProfile(@RequestBody ProtectoraProfileRequest request);
}
