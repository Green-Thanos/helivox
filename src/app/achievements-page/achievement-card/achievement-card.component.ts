import { Component, Input } from '@angular/core';
import { DataService } from 'src/app/shared/services/dta.service';


@Component({
  selector: 'achievement-card',
  templateUrl: './achievement-card.component.html',
  styleUrls: ['./achievement-card.component.css']
})
export class AchievementCardComponent {
  @Input() event: any;
  constructor(private dta: DataService){}
}
