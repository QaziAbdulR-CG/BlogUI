import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Services/user.service';

// import { NgToastService } from 'ng-angular-popup';

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
  constructor(private fb : FormBuilder, 
    private auth : AuthService,
    private router : Router,
    private toastr: ToastrService,
    private userService : UserService
    ){}
    // private toast: NgToastService

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
          this.loginForm.reset();
          this.auth.storeToken(res.token);
          this.toastr.success('Hello world!', 'Toastr fun!');
          const tokenPaylodad = this.auth.decodeToken();
          this.userService.setFullNameToStorage(tokenPaylodad.name);
          this.userService.setRoleToStorage(tokenPaylodad.role)
          // this.toast.success({detail:"SUCCESS",summary:'Your Success Message',duration:5000});
          alert(res.message)
          this.router.navigate(['dashboard'])
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })

    }      
  }
}
