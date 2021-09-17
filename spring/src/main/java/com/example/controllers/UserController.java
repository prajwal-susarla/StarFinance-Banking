package com.example.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import com.example.models.User;
import com.example.models.kyc;
import com.example.payload.request.LoginRequest;
import com.example.payload.request.UpdateRequest;
import com.example.repository.UserRepository;
import com.example.security.services.UserDetailsServiceImpl;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)

public class UserController {
	
	@Autowired
	private UserDetailsServiceImpl userDetailsServiceImpl;
	
	@Autowired
	private UserRepository userRepository;
	
	@GetMapping("/admin/getAllUsers")
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_EMPLOYEE')")
	public List<Map<String, Object>> getAlUsers(){
		return userDetailsServiceImpl.getUsers();
	}
	
	//GET USER BY USER ID
	@GetMapping("/admin/getUser/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public Optional<User> getbyId(@PathVariable Long id) {
		return userDetailsServiceImpl.findById(id);
	}
	
	//DELETE USER INFORMATION
	@DeleteMapping("/admin/deleteUser/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public List<String> deleteUser(@PathVariable Long id) {
		userDetailsServiceImpl.deleteUser(id);
		
		return List.of("user deleted");
	}
	
	@PostMapping("/updateuser")
	public void updateUser(@RequestBody UpdateRequest updateRequest){
		System.out.println(updateRequest.getUsername());
		userDetailsServiceImpl.updateUser(updateRequest.getUsername());	
	}
	
	@PostMapping("/updatecount")
	public void updatecount(@RequestBody UpdateRequest updateRequest ) {
		User user = userRepository.findByUsername(updateRequest.getUsername())
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + updateRequest.getUsername()));
		
		user.setCount(user.getCount()-1);
		userRepository.save(user);
	}


	// @PutMapping("/approvekyc/{username}")
	// @PreAuthorize("hasRole('ROLE_EMPLOYEE')")
	// public void updatekyc(@PathVariable String username ){ userDetailsServiceImpl.updateUser(username); }


}
