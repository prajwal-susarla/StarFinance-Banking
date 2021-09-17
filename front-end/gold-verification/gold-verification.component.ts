import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Loan } from '../models/loan.model';
import { LoanService } from '../_services/loan.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-gold-verification',
  templateUrl: './gold-verification.component.html',
  styleUrls: ['./gold-verification.component.css']
})
export class GoldVerificationComponent implements OnInit {

  loans!:Loan[];
  room='';
  goldtype='';

  constructor(private loanservice: LoanService,
    private route:ActivatedRoute,
    private router:Router,
    private tokenStorage:TokenStorageService
    ) {
      if(this.route.snapshot.params['id']=='accepted'){
        this.room='accepted';
      }
      if(this.route.snapshot.params['id']=='rejected'){
        this.room='rejected';
      }
    
   }

  ngOnInit(): void {
    if(this.tokenStorage.getUser().roles[0]=='ROLE_EMPLOYEE_8'){
      this.goldtype='8 Carat'
    }
    else if(this.tokenStorage.getUser().roles[0]=='ROLE_EMPLOYEE_16'){
      this.goldtype='16 Carat'
    }
    else if(this.tokenStorage.getUser().roles[0]=='ROLE_EMPLOYEE_24'){
      this.goldtype='24 Carat'
    }
    this.loanservice.getall().subscribe(
      response=>{
       if(response){
         this.loans=response;
       }
        console.log (response)
      }
    )
    
  }
  onclickaccepted(){
    if(this.route.snapshot.params['id']=='rejected'){
     this.router.navigate(['../accepted'],{relativeTo:this.route});
     this.room='accepted';
    }
    else{
     this.router.navigate(['accepted'],{relativeTo:this.route});
    }
    
  }
  onclickrejected(){
    if(this.route.snapshot.params['id']=='accepted'){
     this.router.navigate(['../rejected'],{relativeTo:this.route});
     this.room='rejected';
    }
    else{
     this.router.navigate(['rejected'],{relativeTo:this.route});
    }
     
 }
 onclickpending(){
   if(this.route.snapshot.params['id']=='accepted'){
     this.router.navigate(['../'],{relativeTo:this.route});
    }
    else if(this.route.snapshot.params['id']=='rejected'){
      this.router.navigate(['../'],{relativeTo:this.route});
     }
    
  }
  onSubmit(loan:Loan){
    loan.status='gold_accepted';
    
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
      status:'gold_accepted',
      rid:loan.rid,
      rate:loan.rate
    };
    console.log(details)
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
      status:'gold_rejected',
      rid:loan.rid
    };
    this.loanservice.update(details).subscribe(
      response=>{
         console.log (response)
       }
    )

  }

}
