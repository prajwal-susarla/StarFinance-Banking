package com.example.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.ERole;
import com.example.models.Role;
import com.example.models.User;
import com.example.payload.request.LoginRequest;
import com.example.payload.request.SignupRequest;
import com.example.payload.request.kycverify;
import com.example.payload.response.JwtResponse;

import com.example.payload.response.MessageResponse;
import com.example.payload.response.knresponse;
import com.example.repository.RoleRepository;
import com.example.repository.UserRepository;
import com.example.security.jwt.JwtUtils;
import com.example.security.services.UserDetailsImpl;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;
	
	
	
	

	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
		

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		//System.out.println(authentication.getPrincipal().toString());
		
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();		
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());
		
		User user = userRepository.findByUsername(loginRequest.getUsername())
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + loginRequest.getUsername()));

		
		return ResponseEntity.ok(new JwtResponse(jwt, 
												 userDetails.getId(), 
												 user.isVerified(),
												 user.getKn_number(),
												 loginRequest.getUsername(), 
												 userDetails.getEmail(),
												 roles,
												 true));
	}
	
	
	
	@RequestMapping(value = "/logout")
    public String logout(HttpServletRequest request) {
        System.out.println("logout()");
        HttpSession httpSession = request.getSession();
        httpSession.invalidate();
        
        SecurityContextHolder.clearContext();
        
        
        return "logout";
    }
	////sign up 
	
	@PostMapping("/kycverify")
	public boolean getkycverify(@RequestBody kycverify k) {
		System.out.println(k.getUsername());
		User user = userRepository.findByUsername(k.getUsername())
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + k.getUsername()));
		
		return user.isVerified();
	}
	
	@PostMapping("/getknumber")
	public ResponseEntity<?> getkn(@RequestBody kycverify k) {
		System.out.println(k.getUsername());
		User user = userRepository.findByUsername(k.getUsername())
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + k.getUsername()));
		System.out.println(user.getKn_number());
		return ResponseEntity.ok(new knresponse(user.getKn_number()));
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username is already taken!"));
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}

		// Create new user's account
		User user = new User(signUpRequest.getFirstname(),signUpRequest.getLastname(),signUpRequest.getUsername(),signUpRequest.getEmail(),encoder.encode(signUpRequest.getPassword()),signUpRequest.getPhone(),signUpRequest.isVerified());

		Set<String> strRoles = signUpRequest.getRole();
		Set<Role> roles = new HashSet<>();

		if (strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "admin":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);

					break;
				case "emp":
					Role modRole = roleRepository.findByName(ERole.ROLE_EMPLOYEE)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(modRole);

					break;
				case "emp_8":
					Role modRole1 = roleRepository.findByName(ERole.ROLE_EMPLOYEE_8)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(modRole1);

					break;
				case "emp_16":
					Role modRole2 = roleRepository.findByName(ERole.ROLE_EMPLOYEE_16)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(modRole2);

					break;
				case "emp_24":
					Role modRole3 = roleRepository.findByName(ERole.ROLE_EMPLOYEE_24)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(modRole3);

					break;
				default:
					Role userRole = roleRepository.findByName(ERole.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);
				}
			});
		}

		user.setRoles(roles);
		userRepository.save(user);

		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}
}