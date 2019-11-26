import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { AuthenticationService } from '../../../services/authentication.service';


export interface PeriodicElement {
  name: string;
  position: number;
  email: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'User1', email: 'user1@email.com' },
  {position: 2, name: 'User2', email: 'user2@email.com'  },
  {position: 3, name: 'User3', email: 'user3@email.com' },
  {position: 4, name: 'User4', email: 'user4@email.com'  },
  {position: 5, name: 'User5', email: 'user5@email.com' },
  {position: 6, name: 'User6', email: 'user6@email.com' },
  {position: 7, name: 'User7', email: 'user7@email.com'  },
  {position: 8, name: 'User8', email: 'user8@email.com' },
  {position: 9, name: 'User9', email: 'user9@email.com' },
  {position: 10,name: 'User10',email: 'user10@email.com' },
];

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  loading = false;
  user: User;
  
  displayedColumns: string[] = ['position', 'name', 'email'];
  dataSource = ELEMENT_DATA;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.loading = true;
    this.authenticationService.currentUser.subscribe(x => this.user = x);
    console.log(this.user)
    this.loading = false;

  }

}