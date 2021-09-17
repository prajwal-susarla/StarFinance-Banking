package com.example.payload.response;


import java.util.List;


public class JwtResponse {
	private String token;
	private String type = "Bearer";
	private Long id;
	private boolean verified;
	private String knnumber;
	private String username;
	private String email;
	
	private List<String> roles;
	private boolean success;
	

	public JwtResponse(String accessToken, Long id, boolean verified,String knnumber,String username, String email, List<String> roles,boolean success) {
		this.token = accessToken;
		this.id = id;
		this.verified=verified;
		this.knnumber=knnumber;
		this.username = username;
		this.email = email;
		this.roles = roles;
		this.success=success;
	}
	
	
	public String getKnnum() {
		return knnumber;
	}


	public void setKnnum(String knnum) {
		this.knnumber = knnum;
	}


	public boolean getVerified() {
		return verified;
	}


	public void setVerified(boolean verified) {
		this.verified = verified;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}
	public String getAccessToken() {
		return token;
	}

	public void setAccessToken(String accessToken) {
		this.token = accessToken;
	}

	public String getTokenType() {
		return type;
	}

	public void setTokenType(String tokenType) {
		this.type = tokenType;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public List<String> getRoles() {
		return roles;
	}
	
	public boolean isSuccess() {
		success=true;
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}
}