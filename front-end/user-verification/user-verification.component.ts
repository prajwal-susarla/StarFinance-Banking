import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Loan } from '../models/loan.model';
import { AuthService } from '../_services/auth.service';
import { LoanService } from '../_services/loan.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-user-verification',
  templateUrl: './user-verification.component.html',
  styleUrls: ['./user-verification.component.css']
})
export class UserVerificationComponent implements OnInit {

  loans!:Loan[];
  room="pending";
  kn="";
  isLoggedIn=false;
  
  constructor(private loanservice: LoanService,
    private route:ActivatedRoute,
    private router:Router,
    private authservice:AuthService,
    private tokenstorage:TokenStorageService
    ) {
      if(this.route.snapshot.params['id']=='pending'){
        this.room='pending';
      }
      if(this.route.snapshot.params['id']=='previous'){
        this.room='previous';
      }
   }

  ngOnInit(): void {
    //window.location.reload()
    if(this.tokenstorage.getToken()){
      this.isLoggedIn=true
    }
    console.log(this.tokenstorage.getUser().username)
    this.authservice.getkn(this.tokenstorage.getUser().username).subscribe(
      data=>{
        this.kn=data.kn;
        console.log(this.kn)
      }
    )
    this.loanservice.getall().subscribe(
      response=>{
       if(response){
         this.loans=response;
       }
        console.log (response)
      }
    )
    
  }
   onclickprevious(){
    this.room='previous';
    if(this.route.snapshot.params['id']=='pending'){
     this.router.navigate(['../previous'],{relativeTo:this.route});
     this.room='previous';
    }
    else{
     this.router.navigate(['previous'],{relativeTo:this.route});
    }
      
  }
  onclickpending(){
    this.room='pending'
    if(this.route.snapshot.params['id']=='previous'){
      this.router.navigate(['../'],{relativeTo:this.route});
    }
    

  }
  onSubmit(loan:Loan){
    loan.status='accepted';
    const details = {
      kn_number : loan.kn_number,
      gold: loan.gold,
      weight: loan.weight,
      bought_from: loan.bought_from,
      jeweler_name: loan.jeweler_name,
      account_holder_name :loan.account_holder_name,
      type: loan.type,
      account_number : loan.account_number,
      ifsc_code: loan.ifsc_code,
      bank_name:loan.bank_name,
      branch_name:loan.branch_name,
      status:'user_accepted',
      rid:loan.rid,
      rate:loan.rate  
    };
    this.loanservice.update(details).subscribe(
      response=>{
         console.log (response)
       }
    )

  }
  onreject(loan:Loan){
    loan.status='rejected';
    const details = {
      kn_number : loan.kn_number,
      gold: loan.gold,
      weight: loan.weight,
      bought_from: loan.bought_from,
      jeweler_name: loan.jeweler_name,
      account_holder_name :loan.account_holder_name,
      type: loan.type,
      account_number : loan.account_number,
      ifsc_code: loan.ifsc_code,
      bank_name:loan.bank_name,
      branch_name:loan.branch_name,
      status:'user_rejected',
      rid:loan.rid,
      rate:loan.rate
    };
    this.loanservice.update(details).subscribe(
      response=>{
         console.log (response)
       }
    )

  }

}