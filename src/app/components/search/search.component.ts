import { Component, OnInit } from '@angular/core';
import { Image, FirebaseService } from './../../services/firebase.service';
import { PagerService } from './../../services/pager.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public query: any;
  public images: any;
  public success: boolean;
  public queryImages: any[] = [];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
    constructor(
    private firebaseService: FirebaseService,
    private pagerService: PagerService,
    private router: Router,
    private route: ActivatedRoute,    
  ) {}

  ngOnInit() {       
    this.route.queryParams.subscribe(query => {
      this.query = query['q'];      
      this.firebaseService.getImagesByQuery(this.query);   
      this.firebaseService.query.subscribe(queryImages => {
        this.queryImages = queryImages;
        if(this.queryImages.length!=0){
          this.success = true;
          this.setPage(1);
        } else {
          this.success = false;
        }        
    })         
    });     

    
  }
 
  setPage(page: number) {
      if (page < 1 || page > this.pager.totalPages) {
          return;
      }
      // get pager object from service
      this.pager = this.pagerService.getPager(this.queryImages.length, page);

      // get current page of items
      this.pagedItems = this.queryImages.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
