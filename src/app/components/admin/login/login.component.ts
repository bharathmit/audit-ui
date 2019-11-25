import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { Login } from '../../../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loading: boolean;
  login: Login = new Login();
  constructor(private router: Router,
       private loginService: AuthenticationService) { }
  
  
  

  ngOnInit() {
    this.loading= false;
  }

  signin(){
   this.loading =true;
  console.log(this.login);
  this.loginService.authenticate(this.login)
  .subscribe(data => {
    console.log(data);
    this.login = new Login();
    this.goToUser();
  },
   error => console.log(error));

}
goToUser() {
  this.router.navigate(['user']);
}

forgot() {
  this.router.navigate(['forgot-password']);
}

}
