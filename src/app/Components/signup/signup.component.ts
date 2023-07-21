import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{

  signupForm!: FormGroup;

  constructor(private fb : FormBuilder,
     private auth : AuthService,
     private router : Router){}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', [ Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      lastName: ['', [ Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._@-]*')]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
    })
  }
  onSubmit(){
    if(this.signupForm.valid){
      
      console.log(this.signupForm.value);
      this.auth.signUp(this.signupForm.value).
      subscribe({
        next:(res)=>{
          this.signupForm.reset();
          alert(res.message);
          this.router.navigate(['login'])
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })

    }      
  }
}
