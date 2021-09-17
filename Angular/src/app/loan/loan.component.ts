import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Loan } from '../models/loan.model';
import { AuthService } from '../_services/auth.service';
import { LoanService } from '../_services/loan.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {

  loan:Loan ={

    kn_number:'',
    gold:'',
    weight:'',
    bought_from:'',
    jeweler_name:'',
    account_holder_name:'',
    type:'',
    account_number:'',
    ifsc_code:'',
    bank_name:'',
    branch_name:'',
    rate:''
  }

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  username= '';
  kn='';


  constructor(
    private loanservice: LoanService,
    private tokenStorage: TokenStorageService,
    private router:Router,
    private route:ActivatedRoute,
    private authservice:AuthService

  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    this.authservice.getkn(this.tokenStorage.getUser().username).subscribe(
      data=>{
        this.kn=data.kn;
        console.log(this.kn)
      }
    )
  }
  

  onSubmit(): void{
    const details = {
      kn_number : this.kn,
      gold: this.loan.gold,
      weight: this.loan.weight,
      bought_from: this.loan.bought_from,
      jeweler_name: this.loan.jeweler_name,
      account_holder_name :this.loan.account_holder_name,
      type: this.loan.type,
      account_number : this.loan.account_number,
      ifsc_code: this.loan.ifsc_code,
      bank_name:this.loan.bank_name,
      branch_name:this.loan.branch_name,
      status:'pending',
      rid:'',
      rate:this.loan.rate
    };
    this.loanservice.post(details).subscribe(
      response=>{
        if(response){
          this.loanservice.hasApplied=true;
          this.router.navigate(['../userverification'],{relativeTo:this.route});
        }
         console.log (response);
       }
    )

  }

  reloadPage(): void {
    window.location.reload();
  }


}
