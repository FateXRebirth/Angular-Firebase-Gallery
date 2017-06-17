import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router'

import { FlashMessagesModule } from 'angular2-flash-messages'

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import * as admin from 'firebase-admin';

import { FirebaseService } from './services/firebase.service';
import { AuthenticationService } from './services/authentication.service';
import { PagerService } from './services/pager.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SlideshowComponent } from './components/slideshow/slideshow.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { IntroComponent } from './components/intro/intro.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { SearchComponent } from './components/search/search.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';

const appRoutes: Routes = [
  { path: 'index', component: IntroComponent },
  { path: 'home', component: HomeComponent},
  { path: 'search', component: SearchComponent},
  { path: '', component: IntroComponent},
];

const myFirebaseConfig = {
  apiKey: "AIzaSyCYg_BmMdLvYyzrnJM7hn-YonNlaT9sKDQ",
  authDomain: "gallery-228f2.firebaseapp.com",
  databaseURL: "https://gallery-228f2.firebaseio.com",
  projectId: "gallery-228f2",
  storageBucket: "gallery-228f2.appspot.com",
  messagingSenderId: "39963305448",
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
    SearchComponent,
    BreadcrumbsComponent,
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
  providers: [FirebaseService, AuthenticationService, PagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
