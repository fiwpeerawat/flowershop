import { Component, OnInit } from '@angular/core';
import { AfterPaymentService } from '../../services/after-payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-after-payment',
  templateUrl: './view-after-payment.component.html',
  styleUrls: ['./view-after-payment.component.css']
})
export class ViewAfterPaymentComponent implements OnInit {

  payment_order: Payment[];

  constructor(public afterPayment: AfterPaymentService,
    public router: Router) { }

  ngOnInit() {
    this.afterPayment.getDeatilpayment().subscribe((res) => {
      this.payment_order = res;
     
    })
    if (!this.afterPayment.getBilOrder)
      this.router.navigate(['/'])


  }

}

interface Payment {
  Ordernumber: string;
  TEL: string;
  BANK: string;
  PAY_PRICE: string;
  DATE: string;
  TIME: string;
  PAY_IMG: string;
  NOTE: string;
}
