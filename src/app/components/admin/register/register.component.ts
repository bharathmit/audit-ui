import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  emailId: string;
  submitted: boolean;
  loading: boolean = false;
  constructor(private router: Router, private loginservice: AuthenticationService) { }

  ngOnInit() {
    this.submitted = false;
  }

  activate() {
    this.loading = true;
    this.loginservice.activate(this.emailId)
      .subscribe(data => {
        console.log(data);
        this.submitted = true;
      }, error => console.log(error));
  }

  resent() {
    this.submitted = false;
    this.router.navigate(['register'])
  }
}
