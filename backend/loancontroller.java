package com.example.controllers;


import java.util.UUID;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.ERole;
import com.example.models.Role;
import com.example.models.User;
import com.example.models.loan;
import com.example.payload.request.loanupdateRequest;
import com.example.repository.UserRepository;
import com.example.repository.loanrepository;

@RestController
public class loancontroller {
	@Autowired
	private loanrepository l;
	@Autowired
	private UserRepository ur;
	@PostMapping("/applyforloan")
	private boolean check(@RequestBody loan lo) {
		try {
			
		System.out.print("entered post mapping of apply for loan");
		System.out.print(lo);
		
		String id = UUID.randomUUID().toString();
		
		lo.setRid(id.substring(id.length()-6,id.length()).concat(lo.getAccount_number()));
		Character gold=lo.getGold().charAt(0);
		ERole emp_role = null;
		if(gold=='8') {
			emp_role=ERole.ROLE_EMPLOYEE_8;
		}
		if(gold=='1') {
			emp_role=ERole.ROLE_EMPLOYEE_16;
		}
		if(gold=='2') {
			emp_role=ERole.ROLE_EMPLOYEE_24;
		}
		 ArrayList<User> users=new ArrayList<User>();
		 ur.findAll().forEach(users::add);
		Long empid = null;
		int mincount=Integer.MAX_VALUE;
		 for(User u:users) {
			 Set<Role> role=u.getRoles();
			 for(Role r:role) {
				 if(r.getName()==emp_role) {
					 if(mincount>u.getCount()) {
						 mincount=u.getCount();
						 empid=u.getId();
					 }
				 }
			 }
			 
		 }
		 lo.setEmp_id(empid);
		 l.save(lo);
		
		 User user1 = ur.findById(empid)
					.orElseThrow(() -> new UsernameNotFoundException("User Not Found"));
		 
		 user1.setCount(user1.getCount()+1);
		 ur.save(user1);
		 
		
		
		
		return true;
			}
		catch(Exception e) {
			System.out.print(e);
			return false;

	} 
	}
	@RequestMapping("/getallloan")
	private ArrayList<loan> getallloans(){
		ArrayList<loan> loans=new ArrayList<loan>();
		l.findAll().forEach(loans::add);
		System.out.println(loans);
		return loans;
		
	}
	

	
	@PostMapping("/updateloan")
	private void updateloan(@RequestBody loan lo) {
		//lo.setRid(rid);
				
		
//		String stat=lo.getStat();
//		//System.out.println(stat);
//		l1.setStatus(stat);
		//System.out.println(l1);
		
		System.out.println(lo);
		l.save(lo);
		
	}
	
	

}
