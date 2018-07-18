import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetProductDetailService } from '../../services/get-product-detail.service';
import { AuthService } from '../../services/auth.service';
import { ProductIncardNoAuthService } from '../../services/product-incard-no-auth.service';

@Component({
  selector: 'app-detail-item-page',
  templateUrl: './detail-item-page.component.html',
  styleUrls: ['./detail-item-page.component.css']
})
export class DetailItemPageComponent implements OnInit {
  @ViewChild("scrollmenu", { read: ElementRef }) scrollmenu: ElementRef;
  @ViewChild("imgmain", { read: ElementRef }) imgmain: ElementRef;
  public product: Product[];

  constructor(public router: ActivatedRoute,
              public getDetailPro: GetProductDetailService,
              public auth : AuthService,
              public productIncard:ProductIncardNoAuthService) { }

  ngOnInit() {

    var getID = this.router.snapshot.paramMap.get('PID');
    var form = new FormData();
    form.append('PID', getID);
    this.getDetailPro.getDetailProduct(form).subscribe((response) => {
      response.map((res) => {
        res.URL = JSON.parse(res.URL)
      })
      this.product = response;
   
    })


  }


  backImg() {
    this.scrollmenu.nativeElement.scrollLeft = this.scrollmenu.nativeElement.scrollLeft + 40;

  }
  nextImg() {
    this.scrollmenu.nativeElement.scrollLeft = this.scrollmenu.nativeElement.scrollLeft - 40;
  }

  changImg(url: String) {
    this.imgmain.nativeElement.src = url;
  }

  addProduct() {
      if(!this.auth.authenticated){
          var obj = JSON.parse(localStorage.getItem("product"));
          obj.push(this.product[0]);
          localStorage.setItem("product" , JSON.stringify(obj));
          var obj = JSON.parse(localStorage.getItem("product"));
      }
      else{        
        var form = new FormData();
        form.append('product', JSON.stringify(this.product[0].PID) );
        form.append('email',  this.auth.currentUser.email);
        form.append('name', this.auth.currentUser.displayName);
        this.productIncard.addProductToCard(form);     
      }
  }
}

interface Product {
  PID: number;
  NAME: string;
  DETAIL: string;
  PRICE: number;
  URLPROFILE: string;
  URL: string;
}


