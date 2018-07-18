import { Component, OnInit } from '@angular/core';
import { GetProductHomepageService  } from '../../services/get-product-homepage.service';
declare var $:any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public productgroup:Productgroup;
  constructor(public getPro : GetProductHomepageService) { }

  ngOnInit() {
    //localStorage.clear();
    this.getPro.getPruduct().subscribe( (response) =>{
           response.map( (res)=>{
              res.PRODUCT = JSON.parse(res.PRODUCT);              
           } )
           this.productgroup = response;  
    
    } ) 
    if(localStorage.getItem('product') == null ){
      var obj=[];
      localStorage.setItem("product", JSON.stringify(obj));      
    }
    
  }




}

interface Productgroup{
  GID :number;
  GROUPNAME :string;
  PRODUCT : string;
}
