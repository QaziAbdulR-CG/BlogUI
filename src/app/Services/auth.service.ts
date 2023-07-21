import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public baseUrlString = "https://localhost:7254/api/controller/";
  private userPayload : any;
  constructor(private http : HttpClient,
    private route : Router
    ) { 
      this.userPayload = this.decodeToken();
    }

  signUp(userObj:any){
    return this.http.post<any>(this.baseUrlString + 'register', userObj);
  }

  login(loginObj:any){
    return this.http.post<any>(this.baseUrlString + 'authenticate', loginObj);
  }
  signOut(){
    localStorage.clear();
    this.route.navigate(['login']);
  }
  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }
  getToken(){
    return localStorage.getItem('token')
  }
  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }
  decodeToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token)
  }

  getFullNameFromToken(){
    if(this.userPayload)
      return this.userPayload.name;
  }
  getRoleFromToken(){
    if(this.userPayload)
      return this.userPayload.role;
  }
}
