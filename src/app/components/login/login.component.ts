import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { FirebaseService } from './../../services/firebase.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;
  public users: any;
  public confirm: boolean;
  public exist: boolean;
  public user: any;   
  
  constructor(
    private authenticationService: AuthenticationService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private firebaseService: FirebaseService) {
      this.firebaseService.getUser().subscribe(users => {
      this.users = users;
    })
  }

  ngOnInit() {
    this.email = '';
    this.password = '';    
  }

  login(modal: any){   

    this.exist = false;
    this.confirm = false;
    this.users.forEach(user => {     
      if(user.email == modal.email) {
        this.exist = true;      
        if(user.password == modal.password) {
          this.confirm = true;
          this.user = user;
        }
      }
    })

    if(!this.exist) {
      this.flashMessage.show('This E-mail does not exist',
      {cssClass: 'flash-message'});
      return;
    }

    if(!this.confirm) {
      this.flashMessage.show('E-mail and Password do not match', 
      {cssClass: 'flash-message'});
      return;
    }
    //this.authenticationService.login(modal); 
    //this.authenticationService.emitChange(true);
    firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password);
    this.firebaseService.emitChange(true);
    this.router.navigate(['home']);     
  }

  

}
