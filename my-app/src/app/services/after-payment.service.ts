import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AfterPaymentService {

  bill_order: string = null;

  constructor(private http: Http) { }

  setBillNUmber(bill_order) {
    this.bill_order = bill_order;
  }

  getDeatilpayment() {
    var form = new FormData();
    form.append('ordernumber', this.bill_order);
    return this.http.post('https://angsila.cs.buu.ac.th/~57660113/webAPI/customer/get-detail-payment.php', form).pipe(
      map((res) => 
        res.json()        
      )
    )
  }

  get getBilOrder(){
    return this.bill_order
  }



}
