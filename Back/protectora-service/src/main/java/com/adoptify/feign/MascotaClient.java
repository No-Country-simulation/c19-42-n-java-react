package com.adoptify.feign;

import com.adoptify.dto.Mascota;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@FeignClient(name = "gestionmascotas")
public interface MascotaClient {

	@GetMapping("/mascota/buscarPorProtectoraID/{protectoraID}")
	List<Mascota> getMascotasByProtectoraID(@PathVariable("protectoraID") Long protectoraID);
}
