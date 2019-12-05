import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ErrorShowingComponent } from 'src/app/components/error-showing/error-showing.component';
import { Options } from 'selenium-webdriver/chrome';



@Injectable({
  providedIn: 'root'
})
export class ErrorShowingService {
  message: string;

  constructor(public dialog: MatDialog
              ) { }

  modal(message:string): Observable<any> {
    const dialogRef = this.dialog.open(ErrorShowingComponent, {
      disableClose: true,
      hasBackdrop: true,

      width: '250px',
      data: {
        message: message,
        typeD: 'error',
        content: `<ng-container *ngFor="let x of data.status.message"><label [innerHtml]="x"></label>
                          </ng-container>` }
        });
     
    

    return dialogRef.afterClosed();
  }
}
