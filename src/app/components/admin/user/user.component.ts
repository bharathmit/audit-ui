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
    file: [null],
    fullName: this.fb.group({
      firstName: ['', [Validators.required]],
      // lastName: ['', [Validators.required]]
    }),
    dob: ['', [Validators.required ]],
    // email: [this.user.emailId],
    guardian:['', [Validators.required ]],
    
    phoneNumber: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
    address: this.fb.group({
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
    //   cityName: ['', [Validators.required]]
    }),
    gender: ['male'],
    qualification:['', [Validators.required ]],
    ExistingMember:['', [Validators.required ]],
    membershipNo:['', [Validators.required ]],
    gstpNumber:['', [Validators.required ]],
    Martial:['Married'],
    addDynamicElement: this.fb.array([])
  })  

    }
    MatchPassword(abstractControl: AbstractControl) {
        let password = abstractControl.get('password').value;
        let confirmPassword = abstractControl.get('confirmPassword').value;
         if (password != confirmPassword) {
             abstractControl.get('confirmPassword').setErrors({
               MatchPassword: true
             })
        } else {
          return null
        }
      }

      get myForm() {
        return this.registrationForm.controls;
      }
      get addDynamicElement() {
        return this.registrationForm.get('addDynamicElement') as FormArray
      }
      

  /*########################## File Upload ########################*/
  @ViewChild('fileInput',null) el: ElementRef;
  imageUrl: any = 'https://media.rockstargames.com/chinatownwars/global/downloads/avatars/zhou_256x256.jpg';
  editFile: boolean = true;
  removeUpload: boolean = false;

  uploadFile(event) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.registrationForm.patchValue({
          file: reader.result
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
      file: [null]
    });
  }  

  onSubmit() {
    this.submitted = true;
    if(!this.registrationForm.valid) {
      alert('Please fill all the required fields to create a super hero!')
      return false;
    } else {
      console.log(this.registrationForm.value)
    }
  }

  editMode(){
    this.edit = true;
  }
  cancelEditMode(){
    this.edit = false;
    window.scrollTo(0, 1);

  }
}