import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-show-item',
  templateUrl: './product-show-item.component.html',
  styleUrls: ['./product-show-item.component.css']
})
export class ProductShowItemComponent implements OnInit {

  @Input() obj:any;
  @Input() urlImg:String;
  constructor() { }

  ngOnInit() {

  }

}
