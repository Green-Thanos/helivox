import { Component, Output, EventEmitter, Input, ViewChild, HostListener, ElementRef, OnInit } from '@angular/core';
import { CatalogData } from '../../../../shared/catalog-data';
import { DataService } from 'src/app/shared/dta.service';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {



  // Form portion

  @Input() filters: String[];
  @Input() selected: String;

    //Presets

  title = "";
  hrs = null;
  cost = null;


  // Description portion

  isOpen = true;
  notToggled = false;

  commentsToggled = false;

  userRating = -1;
  userRatingOptions = this.dta.getUserRatingOptions();
  openDropDown = false;





  @ViewChild('comments') comments: string;

  @Input() data: CatalogData;
  @Input() index: number;

  @Output() openEvent = new EventEmitter<boolean>();
  @Output() newRating = new EventEmitter<number[]>();




  resubmit = false;

  ngOnInit(): void {
    this.resubmit = this.dta.checkIfResubmit(this.index);
  }
  

  check(){
    if(!this.notToggled && this.isOpen){
      this.openEvent.emit(true);
      
    }

    this.notToggled = false;
  }


  pushComments(){
    if(this.data.comments === undefined){
      this.data.comments = [["Anonymous", this.comments]];
    }
    else{
      this.data.comments.push(["Anonymous", this.comments]);
    }

    this.comments = '';
  }

  parseRating(rating: number){
    this.newRating.emit([this.index, rating]);
    this.openDropDown = false;
    this.dta.addUserRatingLog(this.index);
  }

  constructor(private dta: DataService, private elementRef: ElementRef){}
}
