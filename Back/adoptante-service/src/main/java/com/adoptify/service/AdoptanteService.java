package com.adoptify.service;

import com.adoptify.dto.AdoptanteDto;
import com.adoptify.dto.UserDTO;
import com.adoptify.feign.AuthClient;
import com.adoptify.model.Adoptante;
import com.adoptify.repository.AdoptanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdoptanteService {

	@Autowired
	private AuthClient authClient;

    @Autowired
    private AdoptanteRepository adoptanteRepository;

    public Adoptante registerAdoptante(Adoptante adoptante) {

        return adoptanteRepository.save(adoptante);
    }

    public List<Adoptante> listarAdoptantes(){
        return adoptanteRepository.findAll();
    }

    public Optional<Adoptante> listarAdoptante(Long id){
        return adoptanteRepository.findById(id);
    }

	public void updateAdoptante(Long usuarioId, AdoptanteDto adoptanteDTO) {
		UserDTO user = authClient.getUserById(usuarioId);

		if (user != null) {
			Optional<Adoptante> optionalAdoptante = adoptanteRepository.findByUsuarioId(usuarioId);
			if (optionalAdoptante.isPresent()) {
				Adoptante adoptante = optionalAdoptante.get();
				adoptante.setNombres(adoptanteDTO.getNombres());
				adoptante.setApellidos(adoptanteDTO.getApellidos());
				adoptante.setEdad(adoptanteDTO.getEdad());
				adoptante.setDireccion(adoptanteDTO.getDireccion());
				adoptante.setEmail(adoptanteDTO.getEmail());
				adoptante.setCelular(adoptanteDTO.getCelular());
				adoptanteRepository.save(adoptante);

				user.setId(usuarioId);
				user.setUsername(adoptanteDTO.getUsername());
				authClient.updateUser(usuarioId, user);
			} else {

			}
		} else {

		}
	}

	public Adoptante getAdoptanteByUserId(Long userId) {
		return adoptanteRepository.findByUsuarioId(userId).orElse(null);
	}
}
