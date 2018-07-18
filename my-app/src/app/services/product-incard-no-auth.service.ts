import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductIncardNoAuthService {
  


  constructor(private http: Http) { }


  addProductToCard(form) {
    this.http.post('https://angsila.cs.buu.ac.th/~57660113/webAPI/customer/add-card.php', form).subscribe();
  }
  removeProductinCard(form) {
    this.http.post('https://angsila.cs.buu.ac.th/~57660113/webAPI/customer/remove-card.php', form).subscribe();
   
  }

  mergeCardtoCardInDB(email, name) {
    var obj = localStorage.getItem("product");
    var form = new FormData();
    form.append('product', obj);
    form.append('email', email);
    form.append('name', name);
    this.http.post('https://angsila.cs.buu.ac.th/~57660113/webAPI/customer/merge-card.php', form).subscribe( );
    localStorage.clear();
  }

  getproductIncard(email, name) {
    var form = new FormData();
    form.append('email', email);
    form.append('name', name);
    return this.http.post('https://angsila.cs.buu.ac.th/~57660113/webAPI/customer/get-card.php', form).pipe(
      map((res) => res.json())
    )

  }


  get productNocard() {
    if (localStorage.getItem('product') != null) {
      var obj = localStorage.getItem("product");
      return JSON.parse(obj);
    }
    return [];
  }


}
