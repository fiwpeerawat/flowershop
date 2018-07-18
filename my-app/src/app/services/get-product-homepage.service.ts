import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetProductHomepageService {

  constructor(public http : Http) { }

  getPruduct(){
    return this.http.get("https://angsila.cs.buu.ac.th/~57660113/webAPI/customer/get-product-6-unit.php").pipe(
      map( (res) => res.json() 
    ))
  }

 

}
