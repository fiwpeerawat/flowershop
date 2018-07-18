import { Component, OnInit, Input } from '@angular/core';
import { GetAllproductInGroupService } from "../../services/get-allproduct-in-group.service"
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-product-page',
  templateUrl: './show-product-page.component.html',
  styleUrls: ['./show-product-page.component.css']
})
export class ShowProductPageComponent implements OnInit {

  public idGroup:string;
  public nameGroup:string;
  public productList:Product[];

  constructor(public getAllpro:GetAllproductInGroupService, public router : ActivatedRoute) { }

  ngOnInit() {

      this.idGroup = this.router.snapshot.paramMap.get('GID');
      this.nameGroup = this.router.snapshot.paramMap.get('GROUPNAME');      
      var form = new FormData();
      form.append('GID',this.idGroup);
      this.getAllpro.getProduct(form).subscribe( (response) => {
        this.productList = response;
      } )
  }

}

interface Product{
  PID : number;
  NAME :string;
  DETAIL :string;
  PRICE :number;
  URL :string;
}
