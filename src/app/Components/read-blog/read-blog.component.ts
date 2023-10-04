import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { blog } from 'src/app/Models/blog';
import { BlogService } from 'src/app/Services/blog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { commentModel } from 'src/app/Models/commentModel';
import { UserService } from 'src/app/Services/user.service';
import { AuthService } from 'src/app/Services/auth.service';
import { CommentService } from 'src/app/Services/comment.service';
import { NotificationsService } from 'src/app/Services/notifications.service';

@Component({
  selector: 'app-read-blog',
  templateUrl: './read-blog.component.html',
  styleUrls: ['./read-blog.component.scss'],
})
export class ReadBlogComponent implements OnInit {
  public currentPageId: any = 0;
  public fullName: string = '';
  commentForm!: FormGroup;
  blogObject: blog = {
    title: '',
    content: '',
    summary: '',
    author: '',
    imageUrl: '',
  };
  displaycommentObject: commentModel[] = [];
  commentObject: commentModel = {
    blogId: 0,
    comment: '',
    userName: '',
  };
  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private fb: FormBuilder,
    private userService: UserService,
    private auth: AuthService,
    private commentService: CommentService,
    private router: Router,
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
        this.commentService.getCommentByBlogId(id).subscribe((response) => {
          this.displaycommentObject = response;
          console.log(this.displaycommentObject);
        });
      }
    });
    this.commentForm = this.fb.group({
      comment: ['', Validators.required],
    });
    this.userService.getFullNameFromStorage().subscribe((val) => {
      let getFullNameFromToken = this.auth.getFullNameFromToken();
      this.fullName = val || getFullNameFromToken;
    });
  }
  commentSubmit() {
    this.commentObject.blogId = this.currentPageId;
    this.commentObject.comment = this.commentForm.controls['comment'].value;
    this.commentObject.userName = this.fullName;
    console.log(this.commentObject);
    this.commentService.commentPost(this.commentObject).subscribe({
      next: () => {
        this.commentForm.reset();
        this.notifyService.showSuccess("Comment Added", "Success!");
        // this.router.navigateByUrl(`/read-blog/${this.currentPageId}`);
        window.location.reload()
      },
      error: (err) => {
        alert(err?.error.message);
      },
    });
    // setTimeout(() => {
    //   this.router.navigateByUrl(`/read-blog/${this.currentPageId}`);
    // }, 2000);
  }
}
