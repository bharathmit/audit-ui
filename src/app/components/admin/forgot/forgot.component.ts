import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authSerivce/authentication.service';
import { LoaderService } from '../../../services/loaderService/loader.service';
import { ErrorShowingService } from 'src/app/services/errorService/error-showing.service';


@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  emailId: string;
  submitted = true;
  message: string;
  constructor(private router: Router,
    private loginservice: AuthenticationService,
    private loaderService: LoaderService,
    private errorService: ErrorShowingService
    ) { }

  ngOnInit() {
    window.scrollTo(0, 0)

    this.submitted = false;
  }


  forgot() {
    this.loaderService.show();
    this.loginservice.forgot(this.emailId)
      .subscribe(
        (res)=>{
          console.log(res);
          this.submitted = true;
          this.loaderService.hide();
        },
        (error)=>{

           console.log(error.error.message);
           this.message = error.error.message;
           this.loaderService.hide();
           this.errorService.modal(this.message);
        });
  }

  resent(){
    this.submitted = false;
    this.router.navigate(['forgot-password']);
  }
}
