import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../../services/authSerivce/authentication.service';
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
    window.scrollTo(0, 0)


    this.authService.currentUser
    .subscribe(res => this.user = res);
    console.log(this.user);           

  }
  
logout(){

    this.authService.logout();
    
    this.router.navigate(['home']);


}



}
