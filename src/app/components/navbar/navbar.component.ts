import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, NavigationEnd, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: User;

  constructor( private authService: AuthenticationService,
               private router: Router) { 


               }
 
                

  ngOnInit() {
    this.authService.currentUser
    .subscribe(res => this.user = res);
    console.log(this.user);           

  }

logout(){

    this.authService.logout();
    
    this.router.navigate(['home']);


}



}
