import { Component, OnInit,  ChangeDetectorRef, ElementRef, ViewChild} from '@angular/core';
import { User } from '../../../models/user';
import { AuthenticationService } from '../../../services/authSerivce/authentication.service';
import { FormBuilder,FormControl, FormArray, Validators, AbstractControl } from "@angular/forms";
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import { UserDetails } from 'src/app/models/userDetails';
import { LoaderService } from 'src/app/services/loaderService/loader.service';
import { DatePipe } from '@angular/common';
import { ErrorShowingService } from 'src/app/services/errorService/error-showing.service';
import { AddUser } from 'src/app/models/addUser';


@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    providers:[ DatePipe ]
    
})

export class UserComponent implements OnInit {
    submitted = false;
    loading = false;
    user: User;
    updateProfileEdit: boolean= false;
    addUserEdit:boolean =false;
    searchText:string;
    userDetails: UserDetails = new UserDetails();
    displayedColumns: string[] = ['userId', 'firstName', 'emailId', 'gstpNumber'];
    registrationForm:any;
    error:string = "ERROR";
    addUserNew: AddUser = new AddUser();

    constructor(
        private authenticationService: AuthenticationService,
        public fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private loaderService: LoaderService,
        private datePipe: DatePipe,
        private errorService: ErrorShowingService
               ) {

    }

    

    ngOnInit() {
      window.scrollTo(0, 1);

        this.loading = true;
        this.authenticationService.currentUser.subscribe(x => this.user = x);
        console.log(this.user)
        this.loading = false;
        this.authenticationService.getUsers(this.user)
            .subscribe(
                (res) => {
                    
                    this.displayedColumns = res;
                    console.log(this.displayedColumns);
                },
                (err) => {
                    console.log(err);
                })

    

    /*##################### Registration Form #####################*/
   this.registrationForm = this.fb.group({
    photo: [null],
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required]],
    dob: ['', [Validators.required ]],
    gender: ['Male'],
    Martial:['Married'],
    gstpNumber:['', [Validators.required ]],
    address: ['', [Validators.required]],
    pincode:['',[Validators.required,Validators.maxLength(6), Validators.pattern('^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$')]],
    phoneNumber: ['', [Validators.required,  Validators.pattern('^(?:(?:\\+|0{0,2})91(\\s*[\\-]\\s*)?|[0]?)?[789]\\d{9}$')]],

    email: ['', [Validators.required , Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    // guardian:['', [Validators.required ]],
    qualification:['', [Validators.required ]],
    // ExistingMember:['', [Validators.required ]],
    // membershipNo:['', [Validators.required ]],
  })  

    }
   

      get myForm() {
        return this.registrationForm.controls;
      }
      
      

  /*########################## File Upload ########################*/
  @ViewChild('fileInput',null) el: ElementRef;
  imageUrl: any = 'https://media.rockstargames.com/chinatownwars/global/downloads/avatars/zhou_256x256.jpg';
  editFile: boolean = true;
  removeUpload: boolean = false;

  uploadFile(event) {
    let reader = new FileReader(); // HTML5 FileReader API
    let photo = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(photo);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.registrationForm.patchValue({
          photo: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();        
    }
  }

  // Function to remove uploaded file
  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    this.editFile = true;
    this.removeUpload = false;
    this.registrationForm.patchValue({
      photo: [null]
    });
  }  

  onUpdateProfileSubmit() {
    this.submitted = true;
    this.loaderService.show();
    if(!this.registrationForm.valid) {
      alert('Please fill all the required fields!');
      this.loaderService.hide();

      return false;

    } else {
      this.loaderService.show();
      this.userDetails.userId = this.user.user.userId;
      this.userDetails.address = this.registrationForm.value.address;
      
      this.userDetails.dob = this.datePipe.transform(this.registrationForm.value.dob ,'dd-MM-yyyy');
      this.userDetails.firstName = this.registrationForm.value.firstName;
      this.userDetails.lastName = this.registrationForm.value.lastName;
      this.userDetails.emailId = this.registrationForm.value.email;
      this.userDetails.gender = this.registrationForm.value.gender;
      this.userDetails.maritalStatus = this.registrationForm.value.Martial;
      this.userDetails.gstpNumber = this.registrationForm.value.gstpNumber;
      this.userDetails.mobile = this.registrationForm.value.phoneNumber;
      this.userDetails.pinCode = this.registrationForm.value.pincode;
      this.userDetails.qulification = this.registrationForm.value.qualification;
      this.userDetails.status = "Active";
      // console.log(JSON.stringify(this.userDetails));
      this.authenticationService.updateUser(this.userDetails).subscribe(
        (res) =>{
          this.loaderService.hide();
          window.location.reload();
        },
        (error)=>{
          this.loaderService.hide();

          console.log(error.error.message);
          this.error = error.error.message;
          this.errorService.modal(this.error);

        }
      )
    }
  }
  onAddUserSubmit(){
    this.submitted = true;
    this.loaderService.show();
    if(!this.registrationForm.valid) {
      alert('Please fill all the required fields!');
      this.loaderService.hide();

      return false;

    } else {
      this.loaderService.show();
      this.addUserNew.address = this.registrationForm.value.address;
      this.addUserNew.dob = this.datePipe.transform(this.registrationForm.value.dob ,'dd-MM-yyyy');
      this.addUserNew.firstName = this.registrationForm.value.firstName;
      this.addUserNew.lastName = this.registrationForm.value.lastName;
      this.addUserNew.emailId = this.registrationForm.value.email;
      this.addUserNew.gender = this.registrationForm.value.gender;
      this.addUserNew.maritalStatus = this.registrationForm.value.Martial;
      this.addUserNew.gstpNumber = this.registrationForm.value.gstpNumber;
      this.addUserNew.mobile = this.registrationForm.value.phoneNumber;
      this.addUserNew.pinCode = this.registrationForm.value.pincode;
      this.addUserNew.qulification = this.registrationForm.value.qualification;
      this.addUserNew.status = "InActive";
      this.addUserNew.userId = 0;
      console.log(JSON.stringify(this.addUserNew));
      this.authenticationService.addUsers(this.addUserNew).subscribe(
        (res) =>{
          this.loaderService.hide();
          window.location.reload();
        },
        (error)=>{
          this.loaderService.hide();

          console.log(error.error.message);
          this.error = error.error.message;
          this.errorService.modal(this.error);

        }
      )
    }
    
  }

  updateProfile(){
    this.updateProfileEdit = true;
  }
  addUser(){
    this.addUserEdit = true;
  }
  cancelEditMode(){
    this.updateProfileEdit = false;
    this.addUserEdit = false;

    window.scrollTo(0, 1);

  }
}