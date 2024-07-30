package com.adoptify.service;

import com.adoptify.dto.Mascota;
import com.adoptify.dto.ProtectoraDTO;
import com.adoptify.dto.UserDTO;
import com.adoptify.feign.AuthClient;
import com.adoptify.feign.MascotaClient;
import com.adoptify.model.Protectora;
import com.adoptify.repository.ProtectoraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProtectoraService {

    @Autowired
    private ProtectoraRepository repository;

	@Autowired
	private MascotaClient mascotaClient;

	@Autowired
	private AuthClient authClient;


    public Protectora registerProtectora(Protectora protectora){
        return repository.save(protectora);
    }

    public List<Protectora> listarProtectoras(){
        return repository.findAll();
    }

    public Optional<Protectora> listarProtectora(Long id){
        return repository.findById(id);
    }

	public void updateProtectora(Long usuarioId, ProtectoraDTO protectoraDTO) {
		UserDTO user = authClient.getUserById(usuarioId);

		if (user != null) {
			Optional<Protectora> optionalProtectora = repository.findByUsuarioId(usuarioId);
			if (optionalProtectora.isPresent()) {
				Protectora protectora = optionalProtectora.get();
				protectora.setNombre(protectoraDTO.getNombre());
				protectora.setEmail(protectoraDTO.getEmail());
				protectora.setDireccion(protectoraDTO.getDireccion());
				protectora.setPais(protectoraDTO.getPais());
				protectora.setProvincia(protectoraDTO.getProvincia());
				protectora.setCiudad(protectoraDTO.getCiudad());
				protectora.setCodigoPostal(protectoraDTO.getCodigoPostal());
				protectora.setCelular(protectoraDTO.getCelular());
				repository.save(protectora);

				user.setUsername(protectoraDTO.getUsername());
				authClient.updateUser(usuarioId, user);
			} else {

			}
		} else {

		}
	}

	public List<Mascota> getMascotasByProtectoraID(Long protectoraID) {
		return mascotaClient.getMascotasByProtectoraID(protectoraID);
	}

	public Protectora getProtectoraByUserId(Long userId) {
		return repository.findByUsuarioId(userId).orElse(null);
	}

}
