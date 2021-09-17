import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Loan } from '../models/loan.model';
import { LoanService } from '../_services/loan.service';


@Component({
  selector: 'app-employee-verification',
  templateUrl: './employee-verification.component.html',
  styleUrls: ['./employee-verification.component.css']
})
export class EmployeeVerificationComponent implements OnInit {
  loans!:Loan[];
  room="";
  
  constructor(private loanservice: LoanService,
    private route:ActivatedRoute,
    private router:Router,
    ) {
      if(this.route.snapshot.params['id']=='accepted'){
        this.room='accepted';
      }
      if(this.route.snapshot.params['id']=='rejected'){
        this.room='rejected';
      }
   }

  ngOnInit(): void {
    
    
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
      status:'bank_accepted',
      rid:loan.rid
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
      status:'bank_rejected',
      rid:loan.rid
    };
    this.loanservice.update(details).subscribe(
      response=>{
         console.log (response)
       }
    )

  }
  

}
