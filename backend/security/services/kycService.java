package com.example.security.services;

import java.util.List;

import com.example.models.kyc;
import com.example.repository.kycRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class kycService {
    @Autowired
    private kycRepository repo;
//    public kyc getKycById(int id){
//        return repo.findById(id).orElse(null);
//    }
    public boolean verifykycById(kyc docs){
        try {
            System.out.println("entered");
            kyc k2;
            k2 = repo.findById(docs.getaadhar_number()).orElse(null);
            System.out.println("after k2");
            if (k2.getaadhar_number().equals(docs.getaadhar_number()) && k2.getpan_number().equals(docs.getpan_number()) && k2.getpassport_number().equals(docs.getpassport_number()) && k2.getdrivers_license().equals(docs.getdrivers_license())) {
                 return true;
            }
        }
        catch(Exception e){
            System.out.println("catch block");
            return false;
        }
        return false;
    }
    public kyc saveKyc(kyc docs){
//        kyc kyc1 = new kyc();
//        kyc1.setAadharNumber(docs.getAadharNumber());
//        kyc1.setPanNumber(docs.getPanNumber());
//        kyc1.setDriversLicense(docs.getDriversLicense());
//        kyc1.setPassportNumber(docs.getPassportNumber());
        UserDetailsImpl myuser = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        docs.setUsername(myuser.getUsername());
        return repo.save(docs);

    }
//    public kyc updateKyc(kyc docs){
//        kyc existingdocs = repo.findById(docs.getId()).orElse(null);
//        existingdocs.setaadhar_number(docs.getaadhar_number());
//        existingdocs.setaadhar_number(docs.getaadhar_number());
//        existingdocs.setpan_number(docs.getpan_number());
//        existingdocs.setdrivers_license(docs.getdrivers_license());
//        return repo.save(existingdocs);
//    }

    public List<kyc> getKycRequests(){
        return repo.findAll();
    }
//    public kyc approve(String username){
//        urepo.findByUsername(username);
//        User user1 = new User();
//        user1.getUsername(username);
//
//    }
}
