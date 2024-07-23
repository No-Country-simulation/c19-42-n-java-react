package com.adoptify.service;

import com.adoptify.dto.UserDTO;
import com.adoptify.model.User;
import com.adoptify.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	public void updateUser(Long id, UserDTO userDTO) {
		Optional<User> optionalUser = userRepository.findById(id);
		if (optionalUser.isPresent()) {
			User user = optionalUser.get();
			user.setUsername(userDTO.getUsername());
			userRepository.save(user);
		} else {
			// Manejar el caso donde no se encuentre el usuario
		}
	}

	public Optional<User> getUser(Long id){
		Optional<User> optionalUser = userRepository.findById(id);
		return optionalUser;
	}
}
