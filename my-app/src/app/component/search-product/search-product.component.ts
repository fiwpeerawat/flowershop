import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {


  constructor(public search: SearchService,
    public router: Router) { }

  ngOnInit() {
    if (this.search.getProductList.length == 0)
      this.router.navigate(['/'])
    }

}
