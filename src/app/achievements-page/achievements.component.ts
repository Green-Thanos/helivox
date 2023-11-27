import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/dta.service';

@Component({
  selector: 'achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsPageComponent implements OnInit{
  order = []
  list = [1, 7, 0];

  events = [];

  ngOnInit(): void {
    setTimeout(() => {
      this.events = this.dta.getAchievements().Events;
    //  this.reorder();
    }, 200)
  }

  reorder(){
    this.events.splice(3, 0 , this.events[0]);
    this.events.push(this.events[4]);
    this.events.splice(4,1)
    this.events.splice(0,1)
  }

  constructor(private dta: DataService){}
}
