import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './../../services/firebase.service';
import { PagerService } from './../../services/pager.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public images: any;
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];

  constructor(
    private firebaseService: FirebaseService,
    private pagerService: PagerService,
  ) {
    // this.firebaseService.getImages().subscribe(images => {
    //   this.images = images;
    //   this.setPage(1);
    // })
  }

  ngOnInit() {
    this.firebaseService.getImages().subscribe(images => {
      this.images = images;
      this.setPage(1);
    })
  }

  setPage(page: number) {
      if (page < 1 || page > this.pager.totalPages) {
          return;
      }
      // get pager object from service
      this.pager = this.pagerService.getPager(this.images.length, page);

      // get current page of items
      this.pagedItems = this.images.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
