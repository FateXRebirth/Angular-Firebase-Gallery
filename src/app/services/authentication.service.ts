import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from './firebase.service';
import { Subject } from 'rxjs/Subject';

import * as firebase from 'firebase';


@Injectable()
export class AuthenticationService {
  public user: any;

  constructor(
    private router: Router,
    private firebaseService: FirebaseService
  ) { }

  private emitChangeSource = new Subject<any>();
  changeEmitted$ = this.emitChangeSource.asObservable();

  emitChange(change: any) {
    this.emitChangeSource.next(change);
  }

  logout() {
    localStorage.removeItem("user");
    //this.router.navigate(['home']);
  }

  login(user){
    firebase.auth().signInWithEmailAndPassword(user.email, user.password).catch(function(error) {
      // Handle Errors here.
      var errorMessage = error.message;
      alert(errorMessage);      
      // ...
    });
    localStorage.setItem("user", user); 
    //this.router.navigate(['home']);    
  }
 
  checkCredentials(){
    if (localStorage.getItem("user") === null){
        //this.router.navigate(['login']);
        return false;
    } else {
      return true;
    }
  } 

}


