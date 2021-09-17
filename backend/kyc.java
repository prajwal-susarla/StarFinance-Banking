package com.example.models;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="kyc_docs")
public class kyc {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Id
    @Column(name="id")
    private int id;
    private  String username;
    @Id
    @Column(name="aadhar_number")
    private String aadhar_number;
    @Column(name="pan_number")
    private String pan_number;
    @Column(name="passport_number")
    private String passport_number;
    @Column(name="drivers_license")
    private String drivers_license;

    public kyc() {
    }

    public kyc(String username, String aadhar_number, String pan_number, String passport_number, String drivers_license) {
    	System.out.println("kyc oobject created");
        this.username=username;
        this.aadhar_number = aadhar_number;
        this.pan_number = pan_number;
        this.passport_number = passport_number;
        this.drivers_license = drivers_license;
    }
    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }
    
    public String getUsername() {
        return this.username;
    }
    public void setUsername(String username) {
         this.username = username;
    }

    public kyc(String userid) { 
        this.username = username; 
    }

    public String getaadhar_number() {
        return this.aadhar_number;
    }

    public void setaadhar_number(String aadhar_number) {
        this.aadhar_number = aadhar_number;
    }

    public String getpan_number() {
        return this.pan_number;
    }

    public void setpan_number(String pan_number) {
        this.pan_number = pan_number;
    }

    public String getpassport_number() {
        return this.passport_number;
    }

    public void setpassport_number(String passport_number) {
        this.passport_number = passport_number;
    }

    public String getdrivers_license() {
        return this.drivers_license;
    }

    public void setdrivers_license(String drivers_license) {
        this.drivers_license = drivers_license;
    }


}
