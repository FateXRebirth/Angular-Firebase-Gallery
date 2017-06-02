import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './../../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public images: any;

  constructor(
    private firebaseService: FirebaseService
  ) {
    this.firebaseService.getImages().subscribe(images => {
      this.images = images;
    })
  }

  ngOnInit() {}

}
