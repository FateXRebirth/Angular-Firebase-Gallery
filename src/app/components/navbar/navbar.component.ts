import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],    
})
export class NavbarComponent implements OnInit {  

  loggin: boolean;

  constructor(    
    private authenticationService: AuthenticationService,
    private router: Router) {
      this.authenticationService.changeEmitted$.subscribe(
        value => { 
          this.loggin = value;
        })
    }

  ngOnInit() {    
    console.log("Navbar loading");   
  } 
 
  logout() {
    this.authenticationService.logout();
    this.authenticationService.emitChange(false);   
    this.router.navigateByUrl(this.router.url);
  }
    
}
