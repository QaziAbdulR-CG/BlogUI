import { Component, OnInit } from '@angular/core';
import { blog } from 'src/app/Models/blog';
import { BlogService } from 'src/app/Services/blog.service';

@Component({
  selector: 'app-view-blogs',
  templateUrl: './view-blogs.component.html',
  styleUrls: ['./view-blogs.component.scss'],
})
export class ViewBlogsComponent implements OnInit{
  public blogs: blog[] = [];

  constructor(private blogService : BlogService) {}

  ngOnInit() {
    this.blogService.getAllBlogs().subscribe((response) => {
      this.blogs = response;
      console.log(response);
    });
  }
}
