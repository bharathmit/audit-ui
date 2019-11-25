import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SinglePostComponent } from './components/single-post/single-post.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/admin/login/login.component';
import { RegisterComponent } from './components/admin/register/register.component';
import { ForgotComponent } from './components/admin/forgot/forgot.component';
import { PasswordCreateComponent } from './components/admin/password-create/password-create.component';
import { UserComponent } from './components/admin/user/user.component';


const routes: Routes = [


  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent  },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'single-page', component: SinglePostComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotComponent },
  { path: 'user', component: UserComponent },
  { path: 'password-create', component: PasswordCreateComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
