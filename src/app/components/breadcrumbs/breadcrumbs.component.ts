import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {
  public router: any;
  public url: string;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
  ) { 
    this.router = _router;
  }

  ngOnInit() {
    this._router.events.subscribe( url => {      
      let path = url.toString();
      let start = path.indexOf('/');
      let end = 0;
      if(path.includes("?")){
        end = path.indexOf("?");
      } else {
        end = path.indexOf("'",start+1);
      }
      path= path.slice(start+1, end);      
      let head = path.substring(0,1).toUpperCase();
      let tail = path.substring(1);
      this.url = head + tail;     
    })
  }
}
