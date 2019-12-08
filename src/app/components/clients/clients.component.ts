import { Component, OnInit, Inject, ViewChild, Input, AfterViewInit, Output, EventEmitter  } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authSerivce/authentication.service';
import { User } from 'src/app/models/user';
import { ErrorShowingService } from 'src/app/services/errorService/error-showing.service';
import {MatDialogModule,MAT_DIALOG_DATA,MAT_DIALOG_DEFAULT_OPTIONS, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { UserDetails } from 'src/app/models/userDetails';
import { LyTheme2 } from '@alyle/ui';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from 'src/app/services/loaderService/loader.service';


@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  getUser:User = new User();
  user: UserDetails ;
  closeResult: string;


    constructor(

        private route: ActivatedRoute,
        private authService: AuthenticationService,
        private erroService: ErrorShowingService,
        public dialog: MatDialog,
        private router: Router,
        private modalService: NgbModal,
        private errorService: ErrorShowingService,
        private loaderService: LoaderService
    ) { }

    

    ngOnInit() {
        
       this.loaderService.show();

        this.route.params.subscribe((params: Params) => {

          this.getUser.emailId = params['emailId'];
          console.log(this.getUser.emailId);
          console.log("%cDanger","color:red;font-size:100px;font-style:bold");
           
            this.authService.getUsersByEmail(this.getUser).subscribe((res)=>{
              console.log(res);
              if(res[0]){
              this.user = res[0];
              this.loaderService.hide();
              }else{
                this.loaderService.hide();

              this.router.navigate(['user-not-found']);
              }

            },
            (error)=>{
              this.loaderService.hide();

              this.erroService.modal(error.error.message);
            });
        });

    }
    open(content) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: 'sm',centered: true}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }

    delUser(){
      this.loaderService.show();
      this.authService.delUsers(this.user).subscribe(
        (res)=>{
         this.loaderService.hide();
         alert("Successfully Deleted");
         this.router.navigate(['user']);
          console.log(res);

        },
        (error)=>{
          this.loaderService.hide();

          this.erroService.modal(error.error.message);
        }
      )  
  }

}
