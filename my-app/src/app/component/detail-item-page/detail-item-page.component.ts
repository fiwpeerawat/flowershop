import { Component, OnInit ,ElementRef , ViewChild} from '@angular/core';

@Component({
  selector: 'app-detail-item-page',
  templateUrl: './detail-item-page.component.html',
  styleUrls: ['./detail-item-page.component.css']
})
export class DetailItemPageComponent implements OnInit {
  @ViewChild("scrollmenu", {read: ElementRef}) scrollmenu: ElementRef;
  @ViewChild("imgmain", {read: ElementRef}) imgmain: ElementRef;
  constructor() { }

  ngOnInit() {
  }


  backImg() {    
    this.scrollmenu.nativeElement.scrollLeft = this.scrollmenu.nativeElement.scrollLeft + 40;
   
  }
  nextImg() {    
    this.scrollmenu.nativeElement.scrollLeft = this.scrollmenu.nativeElement.scrollLeft - 40;   
  }

  changImg(url:String){    
    this.imgmain.nativeElement.src = url;
  }

}
