import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { Kyc } from '../models/kyc.model';
import { AuthService } from '../_services/auth.service';
import { KycService } from '../_services/kyc.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.css']
})
export class KycComponent implements OnInit {
  details:any={
    username:''
  }
  kyc:Kyc = {
    aadhar_number: '',
    pan_number:'',
    passport_number:'',
    drivers_license:'',

  }
  



  isKycVerified = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  username!:string;

  constructor(
    private kycservice:KycService,
    private tokenStorage: TokenStorageService,
    private router:Router,
    private route:ActivatedRoute,
    private auth:AuthService
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    console.log(this.isKycVerified)
    this.auth.kycverify(this.tokenStorage.getUser().username).subscribe(
      response=>{
        if(response){
          this.isKycVerified = true;
          console.log(response);
          this.router.navigate(['../loan'],{relativeTo:this.route});
        }
      }
    )
      
    
  }
  onSubmit(): void {
    const data =  {
      aadhar_number : this.kyc.aadhar_number,
      pan_number: this.kyc.pan_number,
      passport_number:this.kyc.passport_number,
      drivers_license:this.kyc.drivers_license 
    };
    
    
    this.kycservice.get(data).subscribe( 
      response=>{
       if(response){
         this.isKycVerified=true;
         this.kycservice.update(this.tokenStorage.getUser().username).subscribe(
          response=>{
            console.log(response);
          }
        )

         
         }
        window.location.reload()
        console.log (response)
      }
    )
    
  }


  logout():void{
    this.tokenStorage.signOut()
    this.isLoggedIn=false;
    window.location.reload
    
  }


  reloadPage(): void {
    window.location.reload();
  }



}