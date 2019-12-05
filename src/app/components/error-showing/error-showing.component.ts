import { Component, OnInit, Inject } from '@angular/core';

import {MatDialogModule,MAT_DIALOG_DATA,MAT_DIALOG_DEFAULT_OPTIONS, MatDialog, MatDialogRef} from '@angular/material/dialog';
// import { LoginComponent } from '../admin/login/login.component';


export interface DialogData {
  message: string;
}

@Component({
  selector: 'app-error-showing',
  templateUrl: './error-showing.component.html',
  styleUrls: ['./error-showing.component.css']
})
export class ErrorShowingComponent implements OnInit {
  

  constructor(
    public dialogRef: MatDialogRef<ErrorShowingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      // console.log(this.data)
     }





  ngOnInit() {
  }

  retry(){
    window.location.reload();

  }




}
