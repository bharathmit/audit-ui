import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorShowingComponent } from './error-showing.component';
import {MatDialogModule,MAT_DIALOG_DEFAULT_OPTIONS, MatDialog, MatDialogRef} from '@angular/material/dialog';

describe('ErrorShowingComponent', () => {
  let component: ErrorShowingComponent;
  let fixture: ComponentFixture<ErrorShowingComponent>;
  let dialog: MatDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [  MatDialogModule ],
      declarations: [ ErrorShowingComponent ],
      providers:[{provide: MatDialogRef, useValue: {}}]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    dialog = TestBed.get(MatDialog);
    let dialogRef = dialog.open(ErrorShowingComponent);


    fixture = TestBed.createComponent(ErrorShowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
