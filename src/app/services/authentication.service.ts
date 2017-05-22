import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from './firebase.service';
 
export class User {
  constructor(
    public name: string,
    public email: string,
    public password: string,) { }
}

@Injectable()
export class AuthenticationService {
  public username: any;

  constructor(
    private router: Router,
    private firebaseService: FirebaseService
  ) { }

  logout() {
    alert("Auth logout");
    
    localStorage.removeItem("user");
    this.router.navigate(['Login']);
  }

  login(email, password){
    alert("Auth login");
    
    if(this.firebaseService.confirm(email, password) == "None") {
      return false;
    } else {
      this.username = this.firebaseService.confirm(email, password);
      localStorage.setItem("user", this.username);
      return true;
    }
 
  }
 
  checkCredentials(){
    alert("Auth check");
    
    if (localStorage.getItem("user") === null){
        this.router.navigate(['Login']);
    }
  } 

}
