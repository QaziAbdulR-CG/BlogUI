import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { BlogService } from 'src/app/Services/blog.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService,
    private blogService: BlogService
  ) {}
  public fullName: string = '';
  ngOnInit(): void {
    this.userService.getFullNameFromStorage().subscribe((val) => {
      let getFullNameFromToken = this.auth.getFullNameFromToken();
      this.fullName = val || getFullNameFromToken;
    });
  }

  logOut() {
    this.auth.signOut();
    this.router.navigate(['login']);
  }
}
