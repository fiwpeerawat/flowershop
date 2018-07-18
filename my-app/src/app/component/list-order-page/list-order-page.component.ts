import { Component, OnInit,  ElementRef } from '@angular/core';
import { GetOrderListService } from '../../services/get-order-list.service'
import { AuthService } from '../../services/auth.service'
import { NotificationPaymentService } from '../../services/notification-payment.service';
import { Router } from '@angular/router'
import { AfterPaymentService } from '../../services/after-payment.service';

@Component({
  selector: 'app-list-order-page',
  templateUrl: './list-order-page.component.html',
  styleUrls: ['./list-order-page.component.css']
})
export class ListOrderPageComponent implements OnInit {

  list_order:any=[];

  constructor(public orderList: GetOrderListService,
     public auth: AuthService, 
     public product: ElementRef,
     public payment : NotificationPaymentService,
     public router : Router,
     public afterPayment:AfterPaymentService) { }
  ngOnInit() {
    var form = new FormData();
    form.append('name', this.auth.currentUser.displayName);
    form.append('email', this.auth.currentUser.email);
    this.orderList.getOrderList(form).subscribe((response) => {
      response.map((res) => {
        res.LIST = JSON.parse(res.LIST)
      })    
      this.list_order = response;
    })

   

  }

  dropdownClick(index) {
    var t = this.product.nativeElement.querySelectorAll("#index" + index);    
    for (let i = 0; i < t.length; i++) {
        if (t[i].style.display == 'none' || t[i].style.display == "")
          t[i].style.display = "table-row";
        else {
          t[i].style.display = "none";
        }
    }
  }

  notiPayment(index){    
      this.payment.setOrderNumber( this.list_order[index].ORDERNUMBER )  
      this.payment.setOrderPrice( this.list_order[index].BillPRICE )     
      this.router.navigate(['Payment'])
  }
  notiPaymentAf(index){

    this.afterPayment.setBillNUmber( this.list_order[index].ORDERNUMBER )
    this.router.navigate(['AfterPayment'])
  }




}



