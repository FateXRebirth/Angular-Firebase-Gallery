import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { FirebaseService } from './../../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;
  
  constructor(
    private authenticationService: AuthenticationService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private firebaseService: FirebaseService,
  ) { }

  ngOnInit() {
    this.email = '';
    this.password = '';
  }

  login() {
    if(1) {
      this.flashMessage.show('You are logged now',
      {cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['home']); 
    } else {
      this.flashMessage.show('Something wrong',
      {cssClass: 'alert-danger', timeout: 3000});
      return;
    }
    
  }

}
