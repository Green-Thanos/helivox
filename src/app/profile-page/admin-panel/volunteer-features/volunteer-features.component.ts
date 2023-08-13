import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/dta.service';

@Component({
  selector: 'volunteer-features',
  templateUrl: './volunteer-features.component.html',
  styleUrls: ['./volunteer-features.component.css']
})
export class VolunteerFeaturesComponent implements OnInit{
  volData = [];
  isOpen = false;
  selected = -1;

  ngOnInit(): void {
    this.volData = this.dta.getVolQuests();
    console.log(this.volData)
  }
  

  constructor(private dta: DataService){}

}
