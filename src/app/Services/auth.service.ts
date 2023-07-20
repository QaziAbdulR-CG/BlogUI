import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public baseUrlString = "https://localhost:7254/api/controller/";

  constructor(private http : HttpClient) { }

  signUp(userObj:any){
    return this.http.post<any>(this.baseUrlString + 'register', userObj);
  }

  login(loginObj:any){
    return this.http.post<any>(this.baseUrlString + 'authenticate', loginObj);
  }
}
