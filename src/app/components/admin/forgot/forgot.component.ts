import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';



@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  emailId: string;
  submitted = true;

  constructor(private router: Router,
    private loginservice: AuthenticationService) { }

  ngOnInit() {
    this.submitted = false;
  }


  forgot() {
    this.loginservice.forgot(this.emailId)
      .subscribe(data => {
        console.log(data);
        this.submitted = true;
      }
      , error => console.log(error));
  }

  resent(){
    this.submitted = false;
    this.router.navigate(['forgot-password']);
  }
}
