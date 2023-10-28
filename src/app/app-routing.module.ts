import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AuthGuard } from './Guards/auth.guard';
import { PostBlogComponent } from './Components/post-blog/post-blog.component';
import { ViewBlogsComponent } from './Components/view-blogs/view-blogs.component';
import { BlogDetailsComponent } from './Components/blog-details/blog-details.component';
import { ReadBlogComponent } from './Components/read-blog/read-blog.component';
import { SearchComponent } from './Components/search/search.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'post-blog', component: PostBlogComponent},
  {path: 'view-blogs', component: ViewBlogsComponent},
  {path: 'view/:id', component: BlogDetailsComponent},
  {path: 'read-blog/:id', component: ReadBlogComponent},
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'search', component: SearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
