import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService, User } from './../../services/firebase.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],    
})
export class NavbarComponent implements OnInit {
  public user: any;
  public imageUrl: any;

  public email: string;
  public password: string;
  public users: any;
  public confirm: boolean;
  public exist: boolean;
  public _user: any; 

  constructor(    
    private flashMessage: FlashMessagesService,
    private firebaseService: FirebaseService,
    private router: Router) {
       this.firebaseService.getUser().subscribe(users => {
      this.users = users;
    })
  }

  ngOnInit() {
    this.email = '';
    this.password = '';  

    this.firebaseService.state.subscribe(state => {
      if(state) {
        this.user = state;
      } else {
        this.user = null;
      }
    })

    this.firebaseService.image.subscribe(image => {
      if(image) {
        this.imageUrl = image;
      } else {
        this.imageUrl = null;
      }
    })

    if(localStorage.getItem("user") != null) {
      this.user = JSON.parse(localStorage.getItem("user"));
    }
    if(localStorage.getItem("image")!= null) {
      this.imageUrl = localStorage.getItem("image");
    }

  } 
 
  logout() {
    this.firebaseService.logout();  
  }

  login(modal: any){   

    this.exist = false;
    this.confirm = false;
    this.users.forEach(user => {     
      if(user.email == modal.email) {
        this.exist = true;      
        if(user.password == modal.password) {
          this.confirm = true;
          this._user = user;
        }
      }
    })

    if(!this.exist) {
      console.log('not exist');
      
      this.flashMessage.show('This E-mail does not exist',
      {cssClass: 'flash-message'});
      return;
    }

    if(!this.confirm) {
      this.flashMessage.show('E-mail and Password do not match', 
      {cssClass: 'flash-message'});
      return;
    }
    this.firebaseService.login(this._user);
    this.router.navigate(['home']);     
  }  

}

