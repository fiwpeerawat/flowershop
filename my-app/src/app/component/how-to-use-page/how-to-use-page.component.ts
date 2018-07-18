import { Component, OnInit , ViewChild , ElementRef } from '@angular/core';

@Component({
  selector: 'app-how-to-use-page',
  templateUrl: './how-to-use-page.component.html',
  styleUrls: ['./how-to-use-page.component.css']
})
export class HowToUsePageComponent implements OnInit {

  @ViewChild('modelImg') modelImg : ElementRef;
  @ViewChild('Imgshow') Imgshow : ElementRef;
  constructor() { }

  ngOnInit() {
  }

  onClickImg(src){
      this.Imgshow.nativeElement.src = src;
      this.modelImg.nativeElement.style.display = 'block';
  }



}
