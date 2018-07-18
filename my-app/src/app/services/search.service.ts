import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public productList:any=[];

  constructor(private http:Http) { }

  searchProduct(form){
    return this.http.post('https://angsila.cs.buu.ac.th/~57660113/webAPI/customer/search-api.php' , form ).pipe( map( (res)=> res.json() ) )
  }

  setProductList(list){
    this.productList = list;
  }

  get getProductList(){
   return  this.productList 
  }


}
