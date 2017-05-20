import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {
  users: FirebaseListObservable<any[]>;
  folder: any;
  ref: any;

  constructor(db: AngularFireDatabase) {
    this.folder = "images";
    this.users = db.list('/users') as FirebaseListObservable<User[]>;
    this.ref = firebase.database().ref('/users');
   }

   createUser(user) {
     this.users.push(user);
   }

   deleteUser(id) {
     this.users.remove(id);
   }

   updateUser(id, data) {
     this.users.update(id, data);
   }

   confirm(email) {
     console.log("Confirming...");
     this.ref.orderByKey().once("value").then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            // key will be "ada" the first time and "alan" the second time
            var key = childSnapshot.key;
            // childData will be the actual contents of the child
            var childData = childSnapshot.val();
            console.log("key->");
            console.log(key);
            console.log("val->");
            console.log(childData);            
          });
        });     
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