import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { BlogApiService } from 'src/app/Services/blog-api.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  constructor(private auth: AuthService,
    private router : Router,
    private blogApiService : BlogApiService,
    private userService : UserService){
  }

  public users: any = [];
  public fullName : string = "";
  ngOnInit() {
    this.userService.getFullNameFromStorage().
      subscribe(val=>{
        let getFullNameFromToken = this.auth.getFullNameFromToken();
        this.fullName = val || getFullNameFromToken;
      });
  }

  logOut(){
    this.auth.signOut();
    this.router.navigate(['login']);
  }
}

