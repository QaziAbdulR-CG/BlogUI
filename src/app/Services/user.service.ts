import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private fullName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");

  constructor() { }

  public getRoleFromStorage(){
    return this.role$.asObservable();
  }
  public setRoleToStorage(role: string){
    this.role$.next(role);
  }
  public getFullNameFromStorage(){
    return this.fullName$.asObservable();
  }
  public setFullNameToStorage(fullName: string){
    this.fullName$.next(fullName);
  }
}
