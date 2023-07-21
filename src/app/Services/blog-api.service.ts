import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogApiService {
  private baseUrl: string = 'https://localhost:7254/api/controller/getAllUsers';

  constructor(private http : HttpClient) { }

  getUsers(){
    return this.http.get<any>(this.baseUrl);
  }
}
