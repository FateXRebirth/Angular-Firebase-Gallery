import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Subject, BehaviorSubject } from 'rxjs';

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
        console.log(user);
      } else {
        // console.log("No user");
      }
    });
    
   }

   public state: Subject<User> = new BehaviorSubject<User>(null);

   ChangeState(state: User) {
     this.state.next(state);
   }

   public image: Subject<string> = new BehaviorSubject<string>(null);

   ChangeImage(image: string) {
     this.image.next(image);
   }

   login(user) {     
     firebase.auth().signInWithEmailAndPassword(user.email, user.password);
     this.ChangeState(user);
     let storageRef = firebase.storage().ref();
        let spaceRef = storageRef.child(user.photo);
        storageRef.child(user.photo).getDownloadURL().then((url) =>{
          this.ChangeImage(url);     
          localStorage.setItem("image", url);          
        }).catch((error) => {
          console.log(error); 
        })      
     localStorage.setItem("user", JSON.stringify(user));
   }

   logout() {
    firebase.auth().signOut().then(function() {
    // Sign-out successful.
    console.log("sign out");      
    }).catch(function(error) {
    // An error happened.
    console.log("sign out error");      
    });
    this.ChangeState(null);
    this.ChangeImage(null);
    localStorage.removeItem("user");
    localStorage.removeItem("image");
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
   }

   deleteUser(id) {
     this.users.remove(id);
   }

   updateUser(id, data) {   
     this.users.update(id, data);
   }
}

export interface User {
  id?: string;
  name?: string;
  phone?: string;
  email?: string;
  password?: string;
  photo?: string
}