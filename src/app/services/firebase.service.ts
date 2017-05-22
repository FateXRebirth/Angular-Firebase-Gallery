import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable()
export class FirebaseService {
  //users: FirebaseListObservable<any[]>;
  folder: any;
  ref: any;
  users: any

  constructor(
      private db: AngularFireDatabase,
      private router: Router,) {
    this.folder = "images";
    //this.users = db.list('/users') as FirebaseListObservable<User[]>;
    this.users = db.list('/users').subscribe();
    this.ref = firebase.database().ref('/users');
   }

   createUser(user) {
     if(this.exist(user.email)) {
       alert("Create exist");
       return false;
     } else {
       this.users.push(user);
       this.router.navigate(['home']); 
       return true;
     }   
   }

   deleteUser(id) {   
     this.users.remove(id);
   }

   updateUser(id, data) {   
     this.users.update(id, data);
   }

   exist(email) {     
     this.users.forEach(item => {
      console.log(item);
      
      if(item.email == email) {
        return true;
      } else {
        return false;
      }
    });
    //  this.ref.on("value",(function(snapshot) {
    //       snapshot.forEach(function(childSnapshot) {
    //         // key will be "ada" the first time and "alan" the second time
    //         var key = childSnapshot.key;
    //         // childData will be the actual contents of the child
    //         var childData = childSnapshot.val();
    //         console.log(childData);
            
    //         if(childData.email == email) {
    //           alert("same");
    //           return true;
    //         }      
    //       });
    //     })
    //  );
    //     return false;     
   }

   confirm(email, password) {     
     this.ref.once("value").then(function(snapshot) {
       snapshot.forEach(function(childSnapshot) {
         var childData = childSnapshot.val();
         if(childData.email == email) {
           if(childData.password == password){
             return childData.firstName;
           }
         }         
       })
     })
     return "None";
   }
}

interface User {
  $key?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}


// export function checkIfUserExists(authData) {
//   return db
//     .child('users')
//     .child(authData.uid)
//     .once('value')
//     .then(dataSnapshot => {
//       return Promise.resolve({
//         authData,
//         userExists: dataSnapshot.exists(),
//       });
//     });
// }

// db.authWithOAuthPopup(provider)
//     .then(checkIfUserExists)
//     .then(({authData, userExists}) => {
//       if (userExists) {
//         // update user
//       } else {
//         // go create a user
//       }
//     })
//     .catch(err => {
//       console.warn('Error signing in.', err);
//     });