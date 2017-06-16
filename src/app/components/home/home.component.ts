import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './../../services/firebase.service';
import { PagerService } from './../../services/pager.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public query: any;
  public images: any;
  public queryImages: any;
  // pager object
  pager: any = {};
  QueryPager: any = {};
  // paged items
  pagedItems: any[];
  QueryPagedItems: any[];

  constructor(
    private firebaseService: FirebaseService,
    private pagerService: PagerService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    // this.firebaseService.getImages().subscribe(images => {
    //   this.images = images;
    //   this.setPage(1);
    // })
  }

  ngOnInit() {
    this.route.queryParams.subscribe( params => {
      if(params['search']) {
        this.query = params['search'];
        console.log(this.query);
        // this.queryImages = this.firebaseService.getImageByQuery(this.query);
        // // this.firebaseService.getImageByQuery(this.query).subscribe(images => {
        // //   this.queryImages = images;
        // //   this.setQueryPage(1);
        // // });
      } else {
        this.queryImages = null;
      }
    })
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

  setQueryPage(page: number) {
      if (page < 1 || page > this.QueryPager.totalPages) {
          return;
      }
      // get pager object from service
      this.QueryPager = this.pagerService.getPager(this.queryImages.length, page);

      // get current page of items
      console.log(this.QueryPagedItems);
      
      this.QueryPagedItems = this.queryImages.slice(this.QueryPager.startIndex, this.QueryPager.endIndex + 1);
  }

}
