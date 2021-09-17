package com.example.security.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.models.User;
import com.example.models.kyc;
import com.example.repository.UserRepository;
import com.example.repository.kycRepository;


@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	@Autowired
	UserRepository userRepository;
	@Autowired
	kycRepository kycrepository;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String userid) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(userid)
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + userid));

		return UserDetailsImpl.build(user);
	}
	
	@Transactional
	public UserDetails loadUserById(Long id) throws UsernameNotFoundException {
		User user = userRepository.findById(id)
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with userid: " + id));

		return UserDetailsImpl.build(user);
	}
	
	//GET ALL USERS IN THE TABLE
	public List<Map<String, Object>> getUsers() {
		return userRepository.getAllUsers();
		
	}
	
	//DELETE USER BY USER ID
	public void deleteUser(Long id) {
		userRepository.deleteById(id);
	}

	//GET USER BY ID
	 public Optional<User> findById(Long id) { 
		 return userRepository.findById(id);
	 }

	public void updateUser(String username){
		String id=UUID.randomUUID().toString();
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

		
		
		System.out.println(user);
		user.setVerified(true);
		user.setKn_number(id.substring(id.length()-6,id.length()).concat(username));
		userRepository.save(user);
	}

	

}