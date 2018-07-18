import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GetAllproductInGroupService {

  constructor(public http:Http) { }


  getProduct(form){
    return this.http.post("https://angsila.cs.buu.ac.th/~57660113/webAPI/customer/get-product-somegroup.php" , form).pipe(
      map( (res) => res.json() 
    ))
  }


}
