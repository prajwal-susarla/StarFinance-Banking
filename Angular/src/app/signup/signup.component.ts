import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  
  form: any = {
    firstname: null,
    lastname: null,
    username: null,
    password: null,
    email:null,
    phone:null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  username= '';

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router:Router,
    private route:ActivatedRoute  
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }

  }

  onSubmit(): void {
    const {firstname,lastname,username ,phone,email, password } = this.form;

    this.authService.signup(username,firstname,lastname,password,email,phone).subscribe(
      data => {
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        console.log(this.isLoggedIn); 
        this.router.navigate(['../login'],{relativeTo:this.route}); 
        
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
