import { Component, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnChanges, OnDestroy, OnInit, DoCheck, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit{  
  title = 'app works!';
  constructor() {}      

  ngOnChanges() {
    //console.log("App change");    
  }
  ngDoCheck() {
    //console.log("App Do Check");    
  }
  ngAfterContentInit() {
    //console.log("App After Content init");
     
  }
  ngAfterContentChecked() {
    //console.log("App After Content Check");    
  }
  ngAfterViewInit() {
    //console.log("App After View init");    
  }
  ngAfterViewChecked() {
    //console.log("App After View Check");    
  }
  ngOnDestroy() {
    //console.log("App Destroy");    
  }
  ngOnInit() {
    //console.log("App init");    
  }
}
