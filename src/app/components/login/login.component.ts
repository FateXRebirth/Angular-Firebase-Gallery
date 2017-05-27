import { Component, OnInit } from '@angular/core';
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
  public users: any;
  public confirm: boolean;
  public exist: boolean;
  public user: any;   
  
  constructor(
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
    this.firebaseService.login(this.user);
    this.router.navigate(['home']);     
  }  

}
