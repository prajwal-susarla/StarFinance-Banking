import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { KycService } from '../_services/kyc.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  };
  u?:string;
  isLoggedIn = false;
  isLoginFailed = false;
  kycverified=false;
  errorMessage = '';
  roles: string[] = [];
  username= '';

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router:Router,
    private service:KycService,
    private route:ActivatedRoute
  ) {
    
   }

   isUser= false;

  ngOnInit(): void {
    if(this.tokenStorage.getUser().roles[0] == "ROLE_EMPLOYEE"){
      this.router.navigate(['../empverification'],{relativeTo:this.route});
    }
    if(this.tokenStorage.getUser().roles[0] == "ROLE_EMPLOYEE_8" || this.tokenStorage.getUser().roles[0] == "ROLE_EMPLOYEE_16" || this.tokenStorage.getUser().roles[0] == "ROLE_EMPLOYEE_24"){
      this.router.navigate(['../goldverification'],{relativeTo:this.route});
    }
    if (this.tokenStorage.getToken()) {
      this.authService.kycverify(this.tokenStorage.getUser().username).subscribe(
        response=>{
          console.log(response)
          
          if(response){
            this.kycverified=true;
             this.router.navigate(['../userverification'],{relativeTo:this.route});
          }
          
        }
      )
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.username = this.tokenStorage.getUser().username;
      
    }

  }
  

  onSubmit(): void {

    const { username, password } = this.form;
    console.log(username);
   
    
    this.service.setMessage(username);

    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        //window.location.reload();
        // this.isLoginFailed = false;
        // this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        
          window.location.reload();
  
        //console.log(this.isLoggedIn);  
       // window.location.replace('/home')
        //console.log(this.tokenStorage.getUser().username)

       
        
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

}