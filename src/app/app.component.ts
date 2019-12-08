import { Component, OnInit } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from './components/admin/login/login.component';
import {MatDialogModule,MAT_DIALOG_DEFAULT_OPTIONS, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { RegisterComponent } from './components/admin/register/register.component';
import { ErrorShowingComponent } from './components/error-showing/error-showing.component';
import { LyTheme2, ThemeVariables } from '@alyle/ui';

const STYLES = (theme: ThemeVariables) => ({
  '@global': {
    body: {
      backgroundColor: theme.background.default,
      color: theme.text.default,
      fontFamily: theme.typography.fontFamily,
      margin: 0,
      direction: theme.direction
    }
  }
});




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit  {
  readonly classes = this.theme.addStyleSheet(STYLES);

  

  title = 'audit-ui';
  name: string="mani";
  color: string="black";
constructor(private theme: LyTheme2) { 


  }
ngOnInit(): void {

  window.scrollTo(0, 0)

}


}