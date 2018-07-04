import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-bill-order-page',
  templateUrl: './bill-order-page.component.html',
  styleUrls: ['./bill-order-page.component.css']
})
export class BillOrderPageComponent implements OnInit, OnDestroy {

  @ViewChild("modelConfirm", { read: ElementRef }) modelConfirm: ElementRef;
  checkbox: boolean;

  constructor(public router: Router) { }

  ngOnInit() { }
  ngOnDestroy() { }

  clickCheck(event: boolean) {
    this.checkbox = event;
  }
  clickconfirm() {
    if (!this.checkbox) {
      $(".text-confirm1").animate({
        color: 'red',
      });
      $(".text-confirm1").animate({
        color: 'black',
      });
      $(".text-confirm1").animate({
        color: 'red',
      });
      $(".text-confirm1").animate({
        color: 'black',
      });
    }
    else {
      $("#Modalconfirm").modal();
    }
  }
  confirm(){
      this.router.navigate(["ListOrder"])
  }

}
