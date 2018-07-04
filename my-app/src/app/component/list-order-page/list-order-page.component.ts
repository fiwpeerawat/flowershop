import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-list-order-page',
  templateUrl: './list-order-page.component.html',
  styleUrls: ['./list-order-page.component.css']
})
export class ListOrderPageComponent implements OnInit {
  //@ViewChild("rowimg", {read: ElementRef}) rowimg: ElementRef;
  list_order: any[] = [
    new Oder() ,  new Oder() , new Oder()
  ];  

  constructor() { }
  ngOnInit() {
  }

  dropdownClick(index) {

    if (!this.list_order[index].btn_Ck) {
    
      for (let i = 0; i < this.list_order[index].list_item.length ; i++) {        
        $('#' + index + this.list_order[index].list_item[i].id)
          .css("display", "table-row");
      }
      this.list_order[index].btn_Ck = true;
    }
    else {
      for (let i = 0; i < this.list_order[index].list_item.length ; i++) {        
        $('#' + index + this.list_order[index].list_item[i].id)
          .css("display", "none");
      }
      this.list_order[index].btn_Ck = false;
    }
    

  }

}
export class Oder {

  btn_Ck: boolean = false;
  order_number: string = "Title";
  list_item: any[] = [
    {
      id:"0",
      img: "",
      test: 'aa'
    },
    {
      id:"1",
      img: "",
      test: 'bb'
    },
    {
      id:"2",
      img: "",
      test: 'cc'
    },
  ]

}


