import { Component, OnInit,  ChangeDetectorRef, ElementRef, ViewChild} from '@angular/core';
import { User } from '../../../models/user';
import { AuthenticationService } from '../../../services/authSerivce/authentication.service';
import { FormBuilder,FormControl, FormArray, Validators, AbstractControl } from "@angular/forms";
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';


@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    
})

export class UserComponent implements OnInit {
    submitted = false;
    loading = false;
    user: User;
    edit: boolean= false;
    searchText:string;
    
    displayedColumns: string[] = ['userId', 'firstName', 'emailId', 'gstpNumber'];
    registrationForm:any
    constructor(
        private authenticationService: AuthenticationService,
        public fb: FormBuilder,
        private cd: ChangeDetectorRef) {

    }

    

    ngOnInit() {
      window.scrollTo(0, 0);

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
    gender: ['male'],
    Martial:['Married'],
    gstpNumber:['', [Validators.required ]],
    address: this.fb.group({
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      
    }),
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

  onSubmit() {
    this.submitted = true;
    if(!this.registrationForm.valid) {
      alert('Please fill all the required fields!')
      return false;
    } else {
      console.log(this.registrationForm.value)
      this.authenticationService
    }
  }

  updateProfile(){
    this.edit = true;
  }
  addUser(){
    this.edit = true;
  }
  cancelEditMode(){
    this.edit = false;
    window.scrollTo(0, 1);

  }
}