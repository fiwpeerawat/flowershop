import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ProductIncardNoAuthService } from "./services/product-incard-no-auth.service"
import { SearchService } from "./services/search.service"
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  nameUser: string;
  flag_of_btn_nav: boolean = false;

  @ViewChild("searchInput") searchInput: ElementRef;
  @ViewChild("nav") nav: ElementRef;

  constructor(
    public router: Router,
    public auth: AuthService, 
    public productIncarde: ProductIncardNoAuthService,
    public search:SearchService) { }

  ngOnInit() {
    $(document).click(function (event) {
      var clickover = $(event.target);
      var _opened = $("#navbarSupportedContent").hasClass("navbar-collapse collapse show");
      if (_opened === true && !clickover.hasClass("navbar-toggler") && !clickover.hasClass("input-search")) {    
        $("button.navbar-toggler").click();
      }});
    $('.my-container').css('min-height', $(window).innerHeight() - 85.375);
  }


  btntogglerClick() {
    if (!this.flag_of_btn_nav) {
      this.nav.nativeElement.style.backgroundColor = '#FFB6C1';
      this.flag_of_btn_nav = true;
    }
    else {
      this.flag_of_btn_nav = false;
      this.nav.nativeElement.style.backgroundColor = 'rgba(255, 182, 193, 0.2)';
    }

  }

  get getName(): string {
    return this.nameUser = this.auth.currentUserDisplayName;
  }

  searchClick(){
    if(this.searchInput.nativeElement.value == '') return;

        var form = new FormData();
        form.append('search' , this.searchInput.nativeElement.value)
        this.search.searchProduct(form).subscribe( 
          (res)=>{
            console.log(res)
            this.search.setProductList(res);            
            this.router.navigate(['Search'])
          }
        )
    
  }



}
