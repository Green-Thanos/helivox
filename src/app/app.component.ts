import { Component } from '@angular/core';
import { DataService } from './shared/services/dta.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'helivox';

  constructor(public dta: DataService){}
}
