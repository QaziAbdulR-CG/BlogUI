import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  type: string = "password"
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash"
  loginForm!: FormGroup;
  constructor(private fb : FormBuilder, private auth : AuthService){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password"
  }
  onSubmit(){
    if(this.loginForm.valid){
      
      console.log(this.loginForm.value);
      this.auth.login(this.loginForm.value).
      subscribe({
        next:(res)=>{
          alert(res.message)
          this.loginForm.reset();
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })

    }      
    else{
      //throw the error toast message
      console.log("Form is invalid!");
      
    }  
  }
}
