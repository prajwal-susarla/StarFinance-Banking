package com.example.repository;


import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.example.models.loan;
public interface loanrepository extends CrudRepository<loan,String> {
	
	

}