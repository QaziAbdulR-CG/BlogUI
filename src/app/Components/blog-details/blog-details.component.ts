import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { blog } from 'src/app/Models/blog';
import { BlogService } from 'src/app/Services/blog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';
import { AuthService } from 'src/app/Services/auth.service';
import { NotificationsService } from 'src/app/Services/notifications.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss'],
})
export class BlogDetailsComponent implements OnInit {

  public currentPageId : any = 0;
  blogUpdateForm!: FormGroup;
  blogObject: blog = {
    title : "",
    content: "",
    summary: "",
    author: "",
    imageUrl: ""
  };

  blogUpdateObject: blog = {
    id: 0,
    title : "",
    content: "",
    summary: "",
    author: "",
    imageUrl: ""
  };
  public fullName : string = "";

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private fb: FormBuilder,
    private userService : UserService,
    private auth: AuthService,
    private router : Router,
    private notifyService : NotificationsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.currentPageId = id;
      if (id) {
        this.blogService.getBlogById(id).subscribe((response) => {
          this.blogObject = response;
          console.log(response);
          console.log(this.blogObject);
        });
      }
    
      this.userService.getFullNameFromStorage().
      subscribe(val=>{
        let getFullNameFromToken = this.auth.getFullNameFromToken();
        this.fullName = val || getFullNameFromToken;
      });
    });
    this.blogUpdateForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      summary: ['', [Validators.required]],
      imageUrl: [''],
    });
  }
  onSubmit(){
      this.blogUpdateObject.id = this.currentPageId;
      this.blogUpdateObject.title = this.blogUpdateForm.controls['title'].value;
      this.blogUpdateObject.content = this.blogUpdateForm.controls['content'].value;
      this.blogUpdateObject.summary = this.blogUpdateForm.controls['summary'].value;
      this.blogUpdateObject.author = this.fullName;
      this.blogUpdateObject.imageUrl = this.blogUpdateForm.controls['imageUrl'].value;
      console.log(this.blogUpdateObject);
      this.blogService.blogUpdate(this.blogUpdateObject).
      subscribe({
        next:()=>{
          this.blogUpdateForm.reset();
          this.notifyService.showSuccess("Redirecting to Dashboard!","Blog Updated Successfully !!")
          this.router.navigate(['dashboard'])
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })
  }

  deletePost(){
    this.blogService.blogDelete(this.currentPageId).
      subscribe({
        next:()=>{
          this.notifyService.showSuccess("Redirecting to Dashboard!","Blog Deleted Successfully !!")
          this.router.navigate(['dashboard'])
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })
  }
}
