package com.example.payload.request;


import java.util.Set;

import javax.validation.constraints.*;
 
public class SignupRequest {
    @NotBlank
    @Size(min = 3, max = 20)
    private String username;

	@NotBlank
	@Size(max = 20)
	private String firstname;

	@NotBlank
	@Size(max = 20)
	private String lastname;
 
    @NotBlank
    @Email
    private String email;
    
    
    @NotBlank
    @Size(min = 6, max = 40)
    private String password;
    
    @NotBlank
    @Size(min=10,max=10)
    private String phone;



	private boolean verified = false;
    
    private Set<String> role;

	public boolean isVerified() { return verified; }

	public void setVerified(boolean verified) { this.verified = verified; }

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	public String getFirstname() {
		return firstname;
	}

	public void setLastname(String lastname) { this.lastname = lastname;
	}
	public String getLastname() { return lastname; }


	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}



	public Set<String> getRole() {
		return role;
	}



	public void setRole(Set<String> role) {
		this.role = role;
	}

}
