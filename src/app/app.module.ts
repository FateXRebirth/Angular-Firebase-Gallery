import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router'

import { FlashMessagesModule } from 'angular2-flash-messages'

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

import { FirebaseService } from './services/firebase.service';
import { AuthenticationService } from './services/authentication.service';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SlideshowComponent } from './components/slideshow/slideshow.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { IntroComponent } from './components/intro/intro.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full'},
  { path: 'index', component: IntroComponent },
  { path: 'home', component: HomeComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent}
];

const myFirebaseConfig = {
  apiKey: "AIzaSyD2ypWn-v2PEoyw24y7QUdICEfgOYEX81I",
  authDomain: "angular2xfirebase.firebaseapp.com",
  databaseURL: "https://angular2xfirebase.firebaseio.com",
  projectId: "angular2xfirebase",
  storageBucket: "angular2xfirebase.appspot.com",
  messagingSenderId: "1048623893586"
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SlideshowComponent,
    FooterComponent,
    HomeComponent,
    IntroComponent,
    SignupComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    FlashMessagesModule,
    AngularFireModule.initializeApp(myFirebaseConfig),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    RouterModule.forRoot(appRoutes)    
  ],
  providers: [FirebaseService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
