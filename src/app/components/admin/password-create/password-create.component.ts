import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-password-create',
  templateUrl: './password-create.component.html',
  styleUrls: ['./password-create.component.css']
})
export class PasswordCreateComponent implements OnInit {
  token: string;
  submitted:boolean;
  password: string;
  emailId: string;
  url: string;

constructor(private router: Router,
    private loginservice: AuthenticationService,
    private activatedRoute: ActivatedRoute) {
      this.activatedRoute.queryParams.subscribe((params: Params) => {
       this.token=params['token'];
        console.log(params['token']);
      });
      this.url=this.router.url;
    }

    ngOnInit() {
      this.submitted= false;
      if(this.url.includes('account/confirm-account?token')){
        this.emailverify()
      }
      if(this.url.includes('account/confirm-password?token')){
        this.passwordverify()
      }
      
    }
  
    emailverify() {
      this.loginservice.emailverify(this.token)
        .subscribe(data => {
          console.log('data')
          this.emailId=data['emailId'];
          this.submitted = true;
        }
        , error =>{
          this.submitted = false;
          console.log(error)
        } );
    }
  
  
    passwordverify() {
      this.loginservice.passwordverify(this.token)
        .subscribe(data => {
          console.log('data')
          this.emailId=data['emailId'];
          this.submitted = true;
        }
        , error =>{
          this.submitted = false;
          console.log(error)
        } );
    }
  
    passwordcreate() {
      console.log(this.password,this.emailId)
      this.loginservice.passwordcreate(this.password,this.emailId)
        .subscribe(data => {
          console.log(data)
          alert("your password has been changed successfully")
          this.router.navigate(['login']);
        }
        , error => console.log(error));
    }

}
