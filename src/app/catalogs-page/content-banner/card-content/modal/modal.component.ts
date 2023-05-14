import { Component, Output, EventEmitter, Input } from '@angular/core';
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

  @Input() data: CatalogData;

  @Output() openEvent = new EventEmitter<boolean>();

  check(){
    if(!this.notToggled && this.isOpen){
      this.openEvent.emit(true);
      
    }

    this.notToggled = false;
  }
}
