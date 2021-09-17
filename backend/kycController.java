package com.example.controllers;

import java.util.ArrayList;
import java.util.List;

import com.example.models.kyc;
import com.example.security.services.kycService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController

public class kycController {
    @Autowired
    private kycService service;
    @PostMapping("/kyc")
    public boolean verifyKyc(@RequestBody kyc docs){
        return service.verifykycById(docs);
    }	

    @PostMapping("/addkyc")
    public kyc addKyc(@RequestBody kyc docs){
        return service.saveKyc(docs);
    }

//    @GetMapping("/viewKyc/{id}")
//    public kyc findKycById(@PathVariable int id){
//        return service.getKycById(id);
//    }



    @GetMapping("/kycRequests")
    @PreAuthorize("hasRole('ROLE_Employee')")
    public List<kyc> findAllKycs(){
        return service.getKycRequests();
    }


//    @PutMapping("/editKyc")
//    public kyc updateKyc(@RequestBody kyc docs){
//        return service.updateKyc(docs);
//    }
}
