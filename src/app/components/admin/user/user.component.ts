import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  loading = false;
  user: User;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.loading = true;
    this.authenticationService.currentUser.subscribe(x => this.user = x);
    console.log(this.user)
    this.loading = false;

  }

}