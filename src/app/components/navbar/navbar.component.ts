import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from './../../services/firebase.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],    
})
export class NavbarComponent implements OnInit { 
  @Input() loggin: boolean;

  constructor(    
    private firebaseService: FirebaseService,
    private router: Router) {
      this.firebaseService.changeEmitted$.subscribe(
        value => { 
          this.loggin = value;
        })              
    }

  ngOnInit() {} 
 
  logout() {
    this.firebaseService.logout();  
    this.router.navigateByUrl(this.router.url);
  }
    
}
