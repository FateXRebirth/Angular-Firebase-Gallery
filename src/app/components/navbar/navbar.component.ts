import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './../../services/firebase.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  firstName: any;
  lastName: any;
  email: any;
  password: any;
  confirmation: any;

  constructor(
    private firebaseService: FirebaseService,
  ) { }

  ngOnInit() {
    console.log("Navbar");
    
  }

  signup() {
    console.log("Submitting...");
    
    let user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    }


    this.firebaseService.confirm(user.email); 

    this.firebaseService.createUser(user);
  }

  login() {
    let user = {
      email: this.email,
      password: this.password
    }

  }

}
