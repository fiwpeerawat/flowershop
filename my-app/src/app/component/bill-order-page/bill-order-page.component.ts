import { Component, OnInit, ElementRef, ViewChild, OnDestroy, } from '@angular/core';
import { Router } from '@angular/router';
import { BillConfirmService } from "../../services/bill-confirm.service"
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-bill-order-page',
  templateUrl: './bill-order-page.component.html',
  styleUrls: ['./bill-order-page.component.css']
})
export class BillOrderPageComponent implements OnInit, OnDestroy {

  @ViewChild("modelConfirm", { read: ElementRef }) modelConfirm: ElementRef;
  @ViewChild("datesent", { read: ElementRef }) datesent: ElementRef;
  @ViewChild("address", { read: ElementRef }) address: ElementRef;
  @ViewChild("btnContinue", { read: ElementRef }) btnContinue: ElementRef;

  checkbox: boolean;
  productList: any = null;
  priceEach: number[] = [];
  priceSum: number = 0;

  constructor(public router: Router,
    public bill: BillConfirmService) { }

  ngOnInit() {
    this.productList = this.bill.getProductList;
    if (this.productList == null)
      this.router.navigate(["/"])
    else {
      for (let i = 0; i < this.productList.length; i++) {
        this.priceSum += parseInt(this.productList[i].PRICE);
        this.priceEach.push(this.priceSum);
      }
    }

  }
  ngOnDestroy() {
    this.bill.setProductList(null);
  }

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
  confirm() {     
      this.btnContinue.nativeElement.disabled = true;   
      var form = new FormData();
      form.append('date' , this.datesent.nativeElement.value);
      form.append('address' , this.address.nativeElement.value);
      form.append('product' ,JSON.stringify(this.productList) );
      form.append('price' ,  String(this.priceSum) );
      this.bill.createBill(form).subscribe(
        (res)=>{
          this.btnContinue.nativeElement.disabled = false;  
           this.router.navigate(["ListOrder"])
        }
      );
    
  }

}
