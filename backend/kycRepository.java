package com.example.repository;

import java.util.Optional;

import com.example.models.kyc;

import org.springframework.data.jpa.repository.JpaRepository;

public interface kycRepository extends JpaRepository<kyc,String>{


    //kyc findById(String adhar);

}
