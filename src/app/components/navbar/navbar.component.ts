import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './../../services/firebase.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],    
})
export class NavbarComponent implements OnInit { 
  loggin: boolean;

  constructor(    
    private firebaseService: FirebaseService,
    private router: Router) {
      this.firebaseService.changeEmitted$.subscribe(
        value => { 
          this.loggin = value;
        })      
    }

  ngOnInit() {
    // firebase.auth().onAuthStateChanged(function(user) {
    //   if (user) {
    //     // User is signed in.
    //     this.loggined = true;
    //     console.log("user exist");
        
    //     // ...
    //   } else {
    //     // User is signed out.
    //     this.loggined = false;
    //     console.log("user not exist");
        
    //   }
    // });
  } 
 
  logout() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log("sign out");      
    }).catch(function(error) {
      // An error happened.
      console.log("sign out error");      
    });

    this.firebaseService.emitChange(false);
    //this.authenticationService.logout();
    //this.authenticationService.emitChange(false);   
    this.router.navigateByUrl(this.router.url);
  }
    
}
