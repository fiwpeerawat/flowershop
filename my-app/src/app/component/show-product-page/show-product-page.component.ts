import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-show-product-page',
  templateUrl: './show-product-page.component.html',
  styleUrls: ['./show-product-page.component.css']
})
export class ShowProductPageComponent implements OnInit {

  @Input() nameGroup:String;

  constructor() { }

  ngOnInit() {
  }

}
