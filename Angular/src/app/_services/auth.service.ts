import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const AUTH_API = 'http://localhost:8080/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectToUrl?:string;

  constructor(private http: HttpClient,private tokenStorageService:TokenStorageService) { }

  login(username: any, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      username,
      password
    }, httpOptions);
  }

  signup(username: string,firstname: string,lastname: string, password: string ,email:string,phone:any): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      firstname,
      lastname,
      password,
      email,
      phone,
    },);
  }

  kycverify(username:string):Observable<any>{
    return this.http.post<any>(AUTH_API+'kycverify',{username});
  }
  
  getkn(username:string):Observable<any>{
    return this.http.post<any>(AUTH_API+'getknumber',{username});
  }
 

  get isLoggedIn() {

    if(!!this.tokenStorageService.getToken()){
      return true;
    }

    return false;
    
  }

  logout():void{
    return this.tokenStorageService.signOut();
  }

}
