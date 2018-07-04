import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.css']
})
export class CardPageComponent implements OnInit {
  

  constructor(public router:Router,  public auth: AuthService) {  }
  ngOnInit() { }

  continueBill(){
    if(this.auth.authenticated){
        this.router.navigate(['BillOrder']);
    }
  }
  

 

}
