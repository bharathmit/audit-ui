import { Component, OnInit,Inject, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authSerivce/authentication.service';
import { Login } from '../../../models/login';
import { LoaderService } from '../../../services/loaderService/loader.service';
import { FormsModule } from '@angular/forms';
// import { ErrorShowingComponent } from '../../error-showing/error-showing.component';
import {MatDialogModule,MAT_DIALOG_DATA,MAT_DIALOG_DEFAULT_OPTIONS, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ErrorShowingService } from 'src/app/services/errorService/error-showing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // providers: [ ErrorShowingComponent ]
})

// export interface DialogData {
//   message: string;
// }


export class LoginComponent implements OnInit {
  error: boolean;
  loading: boolean;
  login: Login = new Login();
  description:string;
  message: string = "Login Failed"


  constructor(
       private router: Router,
       private errorService: ErrorShowingService,
       private loginService: AuthenticationService,
       private loaderService: LoaderService,
     
      ) 
       {    

        }
           
  
  
  

  ngOnInit() {
    window.scrollTo(0, 0)

    this.loading= false;
    this.error = false;

  }

  signin(){
  this.loaderService.show();
  this.loginService.authenticate(this.login)
  .subscribe(
    (res)=>{
        
      console.log(res);
      this.login = new Login();
      this.goToUser();
      this.loaderService.hide();

        
    },
    (error)=>{
      this.loaderService.hide();
      console.log(error.error.message);
      this.message = error.error.message;
      this.errorService.modal(this.message);

    })

}
goToUser() {
  this.router.navigate(['user']);
}

forgot() {
  this.router.navigate(['forgot-password']);
}



}
