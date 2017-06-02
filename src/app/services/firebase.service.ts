import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class FirebaseService {
  users: FirebaseListObservable<User[]>;
  images: FirebaseListObservable<Image[]>;
  photoFolder: any;
  imageFolder: any;

  constructor(db: AngularFireDatabase) {
    this.photoFolder = "photos";
    this.imageFolder = "images";
    this.users = db.list('/users');
    this.images = db.list('/images');
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

   public photo: Subject<string> = new BehaviorSubject<string>(null);

   ChangeImage(photo: string) {
     this.photo.next(photo);
   }  

   upload(imageInfo) {
     let storageRef = firebase.storage().ref();     
     let path = `/${this.imageFolder}/${imageInfo.img.name}`;
     let iRef = storageRef.child(path);
     iRef.put(imageInfo.img).then((snapshot)=> {
       storageRef.child(path).getDownloadURL().then(url => {
         imageInfo.img = url;
         this.images.push(imageInfo);
       }).catch(error => {
         alert(error.message);
       })
       
     }).catch(function(error) {
       alert(error.message);
     });     
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

   getImages() {
     return this.images;
   }

   createUser(user) {
     
     firebase.auth().createUserWithEmailAndPassword(user.email, user.password).catch(function(error) {
       // Handle Errors here.
       var errorMessage = error.message;
       alert(errorMessage);
     });  

     let storageRef = firebase.storage().ref();
     let img = (<HTMLInputElement>document.getElementById('photo')).files[0];
     let path = `/${this.photoFolder}/${img.name}`;
     let iRef = storageRef.child(path);
     iRef.put(img).then((snapshot)=> {
       user.photo = path;
       let key = this.users.push(user).key;
       this.updateUser(key, { id: key});
     }).catch(function(error) {
       alert(error.message);
     });     

     firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(() => {
       let currentUser = firebase.auth().currentUser;
        currentUser.updateProfile({
          displayName: user.name,
          photoURL: user.photo,
        }).then(function() {
          // Update successful.
          console.log("Success");          
        }, function(error) {
          // An error happened.
          console.log("Update user'profile wrong");          
        });
     }).catch(function(error) {
       alert(error.message);
     })

     firebase.auth().signOut();
     
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

export interface Image {
  provider?: string;
  title?: string;
  description?: string;
  img?: string;
  time?: string;
}