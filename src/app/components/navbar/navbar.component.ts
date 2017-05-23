import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],    
})
export class NavbarComponent implements OnInit {
  private loggined: boolean;
  private url: any;

  constructor(    
    private authenticationService: AuthenticationService,
    private router: Router) {
      this.loggined = this.authenticationService.check();
      this.url = this.router.url;
    }

  ngOnInit() {
    console.log(this.loggined);
    console.log(this.url);  
    
  } 
 
  logout() {
    this.authenticationService.logout();
  }

  
}
