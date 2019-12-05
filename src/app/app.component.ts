import { Component, OnInit } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from './components/admin/login/login.component';
import {MatDialogModule,MAT_DIALOG_DEFAULT_OPTIONS, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { RegisterComponent } from './components/admin/register/register.component';
import { ErrorShowingComponent } from './components/error-showing/error-showing.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit  {
  title = 'audit-ui';
  name: string="mani";
  color: string="black";
constructor() { 


  }
ngOnInit(): void {

  window.scrollTo(0, 0)

}


}