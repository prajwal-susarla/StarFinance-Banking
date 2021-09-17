import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Loan } from '../models/loan.model';




const url = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  redirectToUrl?:string;
  hasApplied!:boolean;
  constructor(private http:HttpClient) { }
  post(details:any):Observable<any>{
    return this.http.post<Loan>(url + "/applyforloan" , details)
  }

  get(details:any):Observable<any>{
    return this.http.post<Loan>(url + "/getallloan" , details)
  }

  update(details:any):Observable<any>{
    return this.http.post<Loan>(url+"/updateloan",details)
  }

  getall():Observable<any> {
    return this.http.get<Loan>(url + "/getallloan")
  }
}
