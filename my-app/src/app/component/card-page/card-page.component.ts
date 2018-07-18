import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ProductIncardNoAuthService } from '../../services/product-incard-no-auth.service'
import { BillConfirmService } from "../../services/bill-confirm.service"

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.css']
})
export class CardPageComponent implements OnInit {

  sumPrice: number = 0;
  product: any[] = [];
  productInCheck: any[] = [];
  @ViewChild('noCardinpro') noCardinpro: ElementRef;
  @ViewChild('loander') loander: ElementRef;
  @ViewChild('elNoPro') elNoPro: ElementRef;
  
  constructor(public router: Router,
    public auth: AuthService,
    public mergeCard: ProductIncardNoAuthService,
    public bill: BillConfirmService) { }

  ngOnInit() {
   
    setTimeout(() => {
      if (this.auth.authenticated) {
        this.mergeCard.getproductIncard(this.auth.currentUser.email, this.auth.currentUser.displayName).subscribe((res) => {
          this.product = res;

          for (let i = 0; i < this.product.length; i++) {
            this.sumPrice = this.sumPrice + parseInt(this.product[i].PRICE);
            this.productInCheck.push(this.product[i])
          }
          this.bill.setProductList(this.productInCheck);
          if (this.product.length == 0) {
            this.noCardinpro.nativeElement.style.display = 'block';
            this.loander.nativeElement.style.display = 'none';
          }
         else  this.elNoPro.nativeElement.style.display = 'none';
        })
      }
      else {
        this.product = this.mergeCard.productNocard;
        if (this.product.length == 0) {
          this.noCardinpro.nativeElement.style.display = 'block';
          this.loander.nativeElement.style.display = 'none';
        }
       else this.elNoPro.nativeElement.style.display = 'none';
      }
    }, 1000);

  }

  removeProduct(value) {

    var boo: boolean = false;
    for (let i = 0; i < this.productInCheck.length; i++) {
      if (this.product[value].PCID == this.productInCheck[i].PCID) {
        boo = true;
        break;
      }
    }


    if (this.auth.authenticated) {
      var form = new FormData();
      form.append('PCID', this.product[value].PCID);
      this.mergeCard.removeProductinCard(form);
      if (boo)
        this.sumPrice -= parseInt(this.product[value].PRICE);
      this.product.splice(value, 1);
    }
    else {
      if (boo)
        this.sumPrice -= parseInt(this.product[value].PRICE);
      this.product.splice(value, 1);
      localStorage.setItem("product", JSON.stringify(this.product));
    }



    if (this.product.length == 0) {
      this.elNoPro.nativeElement.style.display = 'block';
      this.noCardinpro.nativeElement.style.display = 'block';
      this.loander.nativeElement.style.display = 'none';
    }


  }

  checkClick(value) {
    if (!value[1]) {
      this.sumPrice -= parseInt(this.product[value[0]].PRICE);
      for (let i = 0; i < this.productInCheck.length; i++) {
        if (this.product[value[0]].PCID == this.productInCheck[i].PCID) {
          this.productInCheck.splice(i, 1);
          break;
        }
      }

    }
    else {
      this.sumPrice += parseInt(this.product[value[0]].PRICE);
      this.productInCheck.push(this.product[value[0]])
    }

    this.bill.setProductList(this.productInCheck);

  }

  continueBill() {
    if (this.auth.authenticated && this.productInCheck.length > 0) {
      this.router.navigate(['BillOrder']);
    }
  }


}
