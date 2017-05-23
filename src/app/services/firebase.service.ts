import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class FirebaseService {
  users: FirebaseListObservable<User[]>;
  folder: any;

  constructor(db: AngularFireDatabase) {
    this.folder = "images";
    this.users = db.list('/users');
   }

   getUser() {
     return  this.users;
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
}

interface User {
  $key?: string;
  name?: string;
  phone?: string;
  email?: string;
  password?: string;
}