import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Starbank1';
  isLoggedin =false;
  iskycverified=false;
  isUser = false;

  constructor(private tokenStrorageService:TokenStorageService,
    private auth:AuthService){}

  ngOnInit ():void{
    this.isLoggedin = !!this.tokenStrorageService.getToken()
    if(this.tokenStrorageService.getUser().roles[0] == "ROLE_USER"){
      this.isUser = true
    }

    this.auth.kycverify(this.tokenStrorageService.getUser().username).subscribe(
      response=>{
        this.iskycverified=response
      }
    )

  }
  logout():void{
    this.tokenStrorageService.signOut()
    this.isLoggedin=false;
    window.location.reload
    
  }
}