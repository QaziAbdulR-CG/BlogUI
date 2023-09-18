import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { commentModel } from '../Models/commentModel';
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  public baseUrlString = 'https://localhost:7254/api/controller/';

  constructor(private http: HttpClient) { }

  commentPost(commentObject: commentModel) {
    return this.http.post<commentModel>(this.baseUrlString + 'postComment', commentObject);
  }
  getCommentByBlogId(id: string){
    return this.http.get<commentModel[]>(this.baseUrlString + 'getById/' + id);
  }
}
