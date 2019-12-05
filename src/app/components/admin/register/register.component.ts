import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from '../../../services/authSerivce/authentication.service';
import { LoaderService } from '../../../services/loaderService/loader.service';
import { ErrorShowingService } from 'src/app/services/errorService/error-showing.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  emailId: string;
  submitted: boolean;
  loading: boolean = false;
  message: string;
  constructor(private router: Router, private loginservice: AuthenticationService,
        private loaderService: LoaderService,
        private errorService: ErrorShowingService
        ) { }

  ngOnInit() {
    window.scrollTo(0, 0)

    this.submitted = false;
  }

  activate() {
    this.loaderService.show();
    this.loginservice.activate(this.emailId)
      .subscribe((data) => {
        console.log(data);
        this.submitted = true;
        this.loaderService.hide();

      }, (error) =>{
         console.log(error);
         this.loaderService.hide();
         this.message = error.error.message;
         this.errorService.modal(this.message);
      })
  }

  resent() {
    this.submitted = false;
    this.router.navigate(['register'])
  }
}
