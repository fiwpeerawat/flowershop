import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NotificationPaymentService } from '../../services/notification-payment.service';
import { Router } from '@angular/router'

declare var $: any;

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {



  @ViewChild('input1') order: ElementRef;
  @ViewChild('input2') tel: ElementRef;
  @ViewChild('input3') bank: ElementRef;
  @ViewChild('input4') price: ElementRef;
  @ViewChild('input5') date: ElementRef;
  @ViewChild('input6') time: ElementRef;
  @ViewChild('input7') img: ElementRef;
  @ViewChild('loader') loader: ElementRef;
  @ViewChild('btnPayment') btnPayment: ElementRef;
  
  imgFile: any;
  note:string;


  constructor(public payment: NotificationPaymentService , public router: Router) { }

  ngOnInit() {
    var order_nm = this.payment.getOrderNumber;
    if (order_nm) {
      this.order.nativeElement.value = order_nm;
      this.price.nativeElement.value = this.payment.getOrderPrice;
    }
    this.initailDate();

  }

  initailDate(){
      //this.date.nativeElement.value
    var date = new Date();
    var y = date.getFullYear();
    var m = String(date.getMonth()+1);
    var d =  String(date.getDate());

    if( m.length == 1 ){
      m = '0'+m;
    }
    if( d.length == 1 ){
      d = '0'+d;
    }
    this.date.nativeElement.value = y+"-"+m+"-"+d;
 
  }

  inputOrder(value) {
    if (value == '')
      this.order.nativeElement.style.border = "1px solid red";
    else
      this.order.nativeElement.style.border = "";
  }

  inputTel(value) {
    if (value == '')
      this.tel.nativeElement.style.border = "1px solid red";
    else
      this.tel.nativeElement.style.border = "";
  }

  inputBank(value) {
    if (value == '-')
      this.bank.nativeElement.style.border = "1px solid red";
    else
      this.bank.nativeElement.style.border = "";
  }

  inputPrice(value) {
    if (value == '')
      this.price.nativeElement.style.border = "1px solid red";
    else
      this.price.nativeElement.style.border = "";
  }

  inputDate(value) {
    if (value == '')
      this.date.nativeElement.style.border = "1px solid red";
    else
      this.date.nativeElement.style.border = "";

  }

  inputTime(value) {
    if (value == '')
      this.time.nativeElement.style.border = "1px solid red";
    else
      this.time.nativeElement.style.border = "";

     
  }
  inputNote(value) {
    this.note = value;
  }
  fileSelected(value) {
    if(!value){
  
      this.img.nativeElement.style.paddingTop = "0px";
      this.img.nativeElement.style.paddingLeft = "0px";
      this.img.nativeElement.style.paddingBottom = "0px";
      this.img.nativeElement.style.border = "1px solid red";
      this.imgFile = '';
    }      
    else{
      this.img.nativeElement.style.border = "";
      this.img.nativeElement.style.paddingTop = "1px";
      this.img.nativeElement.style.paddingLeft = "1px";
      this.img.nativeElement.style.paddingBottom = "1px";
      this.imgFile = value;      
    }

    this.imgFile = value;
   
  }



  confirmClick() {
    var flage:boolean = true;
    if (this.order.nativeElement.value == '') {
      this.order.nativeElement.style.border = "1px solid red";
      flage = false;
    }
    if (this.tel.nativeElement.value == '') {
      this.tel.nativeElement.style.border = "1px solid red";
      flage = false;
    }
    if (this.bank.nativeElement.value == '-') {
      this.bank.nativeElement.style.border = "1px solid red";
      flage = false;
    }
    if (this.price.nativeElement.value == '') {
      this.price.nativeElement.style.border = "1px solid red";
      flage = false;
    }
    if (this.date.nativeElement.value == '') {
      this.date.nativeElement.style.border = "1px solid red";
      flage = false;
    }
    if (this.time.nativeElement.value == '') {
      this.time.nativeElement.style.border = "1px solid red";
      flage = false;
    }
    if(!this.imgFile){
      this.fileSelected(this.imgFile);
      flage = false;
    }
    if(flage) {
      this.btnPayment.nativeElement.disabled = true; 
      var form = new FormData();
      form.append('ordernumber', this.order.nativeElement.value);
      form.append('tel', this.tel.nativeElement.value);
      form.append('bank', this.bank.nativeElement.value);
      form.append('price', this.price.nativeElement.value);
      form.append('date', this.date.nativeElement.value);
      form.append('time', this.time.nativeElement.value);
      form.append('img', this.imgFile);
      form.append('note', this.note);
      this.loader.nativeElement.style.display='block';
      this.payment.addNotificationPaymentDB(form).subscribe(
        (res) => {            
            this.btnPayment.nativeElement.disabled = false;
            this.router.navigate(['/']);
        }
        
      )

    }






  }


}
