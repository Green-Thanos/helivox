import { Component, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/shared/dta.service';

@Component({
  selector: 'middle-banner',
  templateUrl: './middle-banner.component.html',
  styleUrls: ['./middle-banner.component.css']
})
export class MiddleBannerComponent implements OnDestroy {
  animateNum = false;

  listOfNums = this.dta.getStatVal();
  listOfText = this.dta.getStatText();

  currNum = this.listOfNums[0];
  currText = this.listOfText[0];

  i = 0;

  numberChanger = setInterval(() => {
    this.i = (this.i+1) % this.listOfNums.length
    this.currNum = this.listOfNums[this.i];
    this.currText = this.listOfText[this.i];
  }, 9000)

  ngOnDestroy(): void {
    clearInterval(this.numberChanger);
  }

  constructor(private dta: DataService){}

}
