import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-row-product-show',
  templateUrl: './row-product-show.component.html',
  styleUrls: ['./row-product-show.component.css']
})
export class RowProductShowComponent implements OnInit {

  @Input() productgroup:any;
  constructor() {}

  ngOnInit() {    
  }

 
 
}
