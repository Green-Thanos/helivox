import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/services/dta.service';

@Component({
  selector: 'carousel-input',
  templateUrl: './carousel-input.component.html',
  styleUrls: ['./carousel-input.component.css']
})
export class CarouselInputComponent {
  carouselData = this.dta.getCarousel();
  newData = '';
  confirmationModal = false;
  submit(){
    this.confirmationModal = true;
  }
  checkConfirmation(confirmation: boolean){
    if(confirmation){
      if(this.newData !== ""){
        this.carouselData.push(this.newData);
        this.newData = '';
      }
      this.carouselData = this.carouselData.filter((str) => str !== '');
      console.log(this.carouselData);
    }
    this.confirmationModal = false;

    
  }
  trackByFn(index: any, item: any) {
    return index;
 }
  constructor(private dta: DataService){}
}
