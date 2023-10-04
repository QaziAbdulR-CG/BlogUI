import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { BlogService } from 'src/app/Services/blog.service';
import { blog } from 'src/app/Models/blog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService,
    private blogService: BlogService
  ) {}
  public blogs: blog[] = [];
  ngOnInit() {
    this.blogService.getAllBlogs().subscribe((response) => {
      this.blogs = response;
      console.log(response);
    });
  }
}
