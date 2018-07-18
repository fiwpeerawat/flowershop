import { Injectable } from '@angular/core';
import {  Http } from '@angular/http'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BillConfirmService {

  productList : any = null;
  constructor(private http : Http) { }

  public setProductList(product){
    this.productList = product;
  }
  get getProductList(){
    return this.productList;
  }

  createBill(form){
      return this.http.post('https://angsila.cs.buu.ac.th/~57660113/webAPI/customer/create-bill.php' , form).pipe(
        map( (res) => 
        res.json()
      ))
  }


}
