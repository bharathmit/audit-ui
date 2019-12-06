import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from '../../../services/authSerivce/authentication.service';
import { LoaderService } from '../../../services/loaderService/loader.service';
import { ErrorShowingService } from 'src/app/services/errorService/error-showing.service';

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
  password1:string;
  url: string;
  loading: boolean;
  message:string;

constructor(private router: Router,
    private loginservice: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private loaderService: LoaderService,
    private errorService: ErrorShowingService
    ) {
      this.activatedRoute.queryParams.subscribe((params: Params) => {
       this.token=params['token'];
        console.log(params['token']);
      });
      this.url=this.router.url;
    }

    ngOnInit() {
      window.scrollTo(0, 0)

      this.submitted= true;
      if(this.url.includes('account/confirm-account?token')){
        this.emailverify()
      }
      if(this.url.includes('account/confirm-password?token')){
        this.passwordverify()
      }
      this.loading =false;
    }
  
    emailverify() {
      this.loginservice.emailverify(this.token)
        .subscribe(data => {
          console.log('data')
          this.emailId=data['emailId'];
          this.submitted = true;
          this.loaderService.hide();


        }
        , error =>{
          this.submitted = false;
          this.loaderService.hide();

          console.log(error.error.message);
          this.message = error.error.message;
          this.errorService.modal(this.message);
        } );
    }
  
  
    passwordverify() {
      this.loginservice.passwordverify(this.token)
        .subscribe(data => {
          console.log('data')
          this.emailId=data['emailId'];
          this.submitted = true;
          this.loaderService.hide();

        }
        , error =>{
          this.submitted = false;
          this.loaderService.hide();

          console.log(error.error.message);
          this.message = error.error.message;
          this.errorService.modal(this.message);
        } );
    }
  
    passwordcreate() {
      this.loading = true;
      this.loaderService.show();
      console.log(this.password,this.emailId)
      this.loginservice.passwordcreate(this.password,this.emailId)
        .subscribe((data) => {
          console.log(data);
          this.loaderService.hide();
          alert("your password has been changed successfully")
          this.router.navigate(['login']);
        }
        , (error) => {
          this.loaderService.hide();
          console.log(error.error.message);
          this.message = error.error.message;
          this.errorService.modal(this.message);
          this.router.navigate(['login']);
        
        });
    }

}
