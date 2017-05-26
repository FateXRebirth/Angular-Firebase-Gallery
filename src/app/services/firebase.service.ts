import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class FirebaseService {
  users: FirebaseListObservable<User[]>;
  folder: any;

  constructor(db: AngularFireDatabase) {
    this.folder = "photos";
    this.users = db.list('/users');
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        // var displayName = user.displayName;
        // var email = user.email;
        // var emailVerified = user.emailVerified;
        // var photoURL = user.photoURL;
        // var isAnonymous = user.isAnonymous;
        // var uid = user.uid;
        // var providerData = user.providerData;
        console.log(user.uid);
      } else {
        // console.log("No user");
      }
    });
    
   }

   private emitChangeSource = new Subject<any>();
   changeEmitted$ = this.emitChangeSource.asObservable();

   emitChange(change: any) {
     this.emitChangeSource.next(change);
   }

   getUser() {
     return  this.users;     
   }

   createUser(user) {
     
     firebase.auth().createUserWithEmailAndPassword(user.email, user.password).catch(function(error) {
       // Handle Errors here.
       var errorMessage = error.message;
       alert(errorMessage);
     });   

     let storageRef = firebase.storage().ref();
     let img = (<HTMLInputElement>document.getElementById('photo')).files[0];
     let path = `/${this.folder}/${img.name}`;
     let iRef = storageRef.child(path);
     iRef.put(img).then((snapshot)=> {
       user.photo = path;
       let key = this.users.push(user).key;
       this.updateUser(key, { id: key});
     }).catch(function(error) {
       alert(error.message);
     });     

    //   firebase.auth().signInWithEmailAndPassword(user.email, user.password).catch(function(error) {
    //    alert(error.message);
    //  });

    //  this.emitChange(true);

    //  let currentUser = firebase.auth().currentUser;     

    //  currentUser.updateProfile({
    //     displayName: user.name,
    //     photoURL: user.path,
    //   }).then(function() {
    //     // Update successful.
    //   }, function(error) {
    //     // An error happened.
    //     alert(error.message);        
    //   });
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
  uid?: string;
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