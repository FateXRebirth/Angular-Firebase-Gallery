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
  public name: string;
  public phone: string;
  public email: string;
  public password: string;
  public confirmation: string;
  public users: any;
  public exist: boolean;

  constructor(
    private firebaseService: FirebaseService,
    private flashMessage: FlashMessagesService,
    private router: Router,
  ) {
    this.firebaseService.getUser().subscribe(users => {
      this.users = users;
    })
  }

  ngOnInit() {    
    this.name = '';
    this.phone = '';
    this.email = '';
    this.password = '';
    this.confirmation = '';    
  }

  signup(modal: any) {      

    this.exist = false;
    this.users.forEach(user => {
      if(user.email == modal.email) {
        this.exist = true;      
      }
    })

    if(this.exist) {
      this.flashMessage.show('This E-mail is exist', 
      {cssClass: 'flash-message'});
      return;
    }

    if(modal.password != modal.confirmation) {
      this.flashMessage.show('Password should be same', 
      {cssClass: 'flash-message'});
      this.password = '';
      this.confirmation = '';
      return;
    }

    let user = {
      name: modal.name,
      phone: modal.phone,
      email: modal.email,
      password: modal.password,
    }
    this.firebaseService.createUser(user);
    this.router.navigate(['home']);    
  }

}
