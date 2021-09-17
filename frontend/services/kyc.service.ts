import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Kyc } from '../models/kyc.model';


const url = 'http://localhost:8080';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class KycService {
  redirectToUrl?:string;
  isverified!:boolean;
  private message =new BehaviorSubject<string>("Default");
  message$=this.message.asObservable();
  
  constructor(private http:HttpClient) { }
  get(data:any):Observable<any>{
    return this.http.post<Kyc>(url + "/kyc" , data)
  }

  update(username:string):Observable<any>{
    return this.http.post(url + "/updateuser", {username},httpOptions)
  }
  setMessage(s:string){
    this.message.next(s);
    
  }
  
  
  
  getall():Observable<any> {
    return this.http.get<Kyc>(url + "kyc")
  }


}
