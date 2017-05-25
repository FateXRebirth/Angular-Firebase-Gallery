import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {
  users: FirebaseListObservable<User[]>;
  folder: any;

  constructor(db: AngularFireDatabase) {
    this.folder = "photos";
    this.users = db.list('/users');
   }

   getUser() {
     return  this.users;
     
   }

   createUser(user) {
     let storageRef = firebase.storage().ref();
     let img = (<HTMLInputElement>document.getElementById('photo')).files[0];
     let path = `/${this.folder}/${img.name}`;
     let iRef = storageRef.child(path);
     iRef.put(img).then((snapshot)=> {
       user.photo = img.name;
       user.path = path;
       this.users.push(user);
     })      
   }

   deleteUser(id) {
     this.users.remove(id);
   }

   updateUser(id, data) {   
     this.users.update(id, data);
   }
}

interface User {
  $key?: string;
  name?: string;
  phone?: string;
  email?: string;
  password?: string;
  photo?: string
}



// let storageRef = firebase.storage().ref();
//       let spaceRef = storageRef.child(listing.path);
//       storageRef.child(listing.path).getDownloadURL().then((url) =>{
//         this.imageUrl = url;
//       }).catch((error) => {
//         console.log(error); 