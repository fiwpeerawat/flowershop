import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GetOrderListService {

  constructor(private http : Http) { }


  getOrderList(form){
      return this.http.post('https://angsila.cs.buu.ac.th/~57660113/webAPI/customer/get-list-order.php' , form).pipe(
        map( res => res.json() )
      )
  }
}
