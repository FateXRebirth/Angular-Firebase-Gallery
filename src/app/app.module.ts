import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router'

import { FlashMessagesModule } from 'angular2-flash-messages'
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

import { FirebaseService } from './services/firebase.service'
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SlideshowComponent } from './components/slideshow/slideshow.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { IntroComponent } from './components/intro/intro.component';

const appRoutes: Routes = [
  { path: '', component: IntroComponent },
  { path: 'home', component: HomeComponent}
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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(myFirebaseConfig),
    RouterModule.forRoot(appRoutes)    
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
