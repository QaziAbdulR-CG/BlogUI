import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { NotificationsService } from '../Services/notifications.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth : AuthService,
    private router: Router,
    private notification : NotificationsService){

  }
  canActivate():boolean{
    if(this.auth.isLoggedIn()){
      return true;
    }
    else{
      this.notification.showWarning("Please Login First", "Invalid Request");
      // alert('Please login first!')
      this.router.navigate(['login']);
      return false;
    }
  }
  
}
