import { Component, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { CatalogData } from '../../../../shared/catalog-data';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  isOpen = true;
  notToggled = false;

  commentsToggled = false;

  @ViewChild('comments') comments: string;

  @Input() data: CatalogData;

  @Output() openEvent = new EventEmitter<boolean>();

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
}
