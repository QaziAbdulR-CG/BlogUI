import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { blog } from 'src/app/Models/blog';
import { BlogService } from 'src/app/Services/blog.service';
import { NotificationsService } from 'src/app/Services/notifications.service';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-post-blog',
  templateUrl: './post-blog.component.html',
  styleUrls: ['./post-blog.component.scss']
})
export class PostBlogComponent implements OnInit{
  blogPostForm!: FormGroup;

   blogDto :blog;
   public fullName : string = "";

  constructor(private fb : FormBuilder,
    private blogService : BlogService,
    private router : Router,
    private notifyService : NotificationsService,
    private userService : UserService,
    private auth: AuthService){
      this.blogDto = new blog();
    }

  ngOnInit(): void {
    this.blogPostForm = this.fb.group({
      title: ['', [ Validators.required]],
      content: ['', [ Validators.required]],
      summary: ['', [Validators.required]],
      imageUrl: [''],
    })

    this.userService.getFullNameFromStorage().
      subscribe(val=>{
        let getFullNameFromToken = this.auth.getFullNameFromToken();
        this.fullName = val || getFullNameFromToken;
      });

  }
  onSubmit(){
    if(this.blogPostForm.valid){
      
      console.log(this.blogPostForm.value);
      this.blogDto.title = this.blogPostForm.controls['title'].value;
      this.blogDto.content = this.blogPostForm.controls['content'].value;
      this.blogDto.summary = this.blogPostForm.controls['summary'].value;
      this.blogDto.author = this.fullName;
      this.blogDto.imageUrl = this.blogPostForm.controls['imageUrl'].value;
      console.log(this.blogDto);
      this.blogService.blogPost(this.blogDto).
      subscribe({
        next:()=>{
          this.blogPostForm.reset();
          this.notifyService.showSuccess("Redirecting to Dashboard!","Blog Created Successfully !!")
          this.router.navigate(['dashboard'])
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })
    }      
  }

  
  
}
