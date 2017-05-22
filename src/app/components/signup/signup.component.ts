import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './../../services/firebase.service';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public confirmation: string;

  constructor(
    private firebaseService: FirebaseService,
    private flashMessage: FlashMessagesService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
    this.confirmation = '';
  }

  signup() {
    if(this.firstName == '' || this.lastName == '' || 
        this.email == '' || this.password == '' || 
        this.confirmation == '') {
          this.flashMessage.show('All information require',
          {cssClass: 'alert-danger', timeout: 3000});
          return;
    }

    if(this.password != this.confirmation) {
      this.flashMessage.show('Password should be same', 
      {cssClass: 'alert-danger', timeout: 3000});
      this.password = '';
      this.confirmation = '';
      return;
    }

    let user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    }
    
    if(this.firebaseService.createUser(user)) {
      
       
    } else {
      this.flashMessage.show('This E-mail is exist', 
      {cssClass: 'alert-danger', timeout: 3000});
      return;
    }    
    
  }

}
