import { Component, OnInit, Input, Output , EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-page-item',
  templateUrl: './card-page-item.component.html',
  styleUrls: ['./card-page-item.component.css']
})
export class CardPageItemComponent implements OnInit {

  @Input() product:any;
  @Input() index:any;
  @Output() outputindex:EventEmitter<any> = new EventEmitter();
  @Output() outputchecked:EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  remove(){
    this.outputindex.emit(this.index);
  }

  checkClick(value){
    var arr = [ this.index , value.checked  ];
    this.outputchecked.emit(arr);   
   
  }

}
