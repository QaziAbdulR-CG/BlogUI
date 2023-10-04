import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { blog } from '../Models/blog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  public baseUrlString = 'https://localhost:7254/api/controller/';
  // public baseUrlString = 'https://blogapi20230920131656.azurewebsites.net/api/controller/';


  constructor(private http: HttpClient, private route: Router) {}

  getAllBlogs() : Observable<blog[]>{
    return this.http.get<blog[]>(this.baseUrlString + 'getAllBlogs');
  }
  blogPost(postObject: blog) {
    return this.http.post<blog>(this.baseUrlString + 'postBlog', postObject);
  }
  blogUpdate(putObject: blog) {
    return this.http.put<blog>(this.baseUrlString + putObject.id, putObject);
  }
  blogDelete(id: number) {
    return this.http.delete<blog>(this.baseUrlString + id);
  }
  getBlogById(id: string) : Observable<blog>{
    return this.http.get<blog>(this.baseUrlString + id);
  }
}
