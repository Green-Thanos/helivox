import { Component, AfterViewInit, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/dta.service';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit {
  // implements AfterviewInit
  images: string[] = this.dta.getCarousel();
  i: number = 0;

  changeImg(isDecrease: boolean) {
    if (isDecrease) {
      this.i = this.i === 0 ? this.images.length - 1 : this.i - 1;
    } else {
      this.i = (this.i + 1) % this.images.length;
    }
  }

  ngOnInit(): void {
    console.log(this.dta.getCarousel());
  }
  constructor(private dta: DataService) {}
  // images: string[] = this.dta.getCarousel();
  // i: number = 0;
  // imagesLoaded: boolean = false;

  // constructor(private dta: DataService) {}

  // ngAfterViewInit() {
  //   this.preloadImages().then(() => {
  //     this.imagesLoaded = true;
  //   });
  // }

  // async preloadImages() {
  //   const imagePromises = this.images.map(imageUrl => {
  //     return new Promise<void>(resolve => {
  //       const img = new Image();
  //       img.onload = () => resolve();
  //       img.src = imageUrl;
  //     });
  //   });

  //   await Promise.all(imagePromises);
  // }

  // changeImg(isDecrease: boolean) {
  //   if (isDecrease) {
  //     this.i = (this.i - 1 + this.images.length) % this.images.length;
  //   } else {
  //     this.i = (this.i + 1) % this.images.length;
  //   }
  // }
}
