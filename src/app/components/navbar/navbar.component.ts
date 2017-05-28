import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService, User } from './../../services/firebase.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],    
})
export class NavbarComponent implements OnInit {
  public user: any;
  public imageUrl: any;

  constructor(    
    private firebaseService: FirebaseService,
    private router: Router) {}

  ngOnInit() {
    this.firebaseService.state.subscribe(state => {
      if(state) {
        this.user = state;
        // let storageRef = firebase.storage().ref();
        // let spaceRef = storageRef.child(state.photo);
        // storageRef.child(state.photo).getDownloadURL().then((url) =>{
        //   this.imageUrl = url;      
        //   localStorage.setItem("image", this.imageUrl);          
        // }).catch((error) => {
        //   console.log(error); 
        // })      
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
    
}
