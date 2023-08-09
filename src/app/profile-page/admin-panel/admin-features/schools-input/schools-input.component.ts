import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/services/dta.service';

@Component({
  selector: 'schools-input',
  templateUrl: './schools-input.component.html',
  styleUrls: ['./schools-input.component.css']
})
export class SchoolsInputComponent {
  schools = this.dta.getAllSchools();
  constructor(private dta: DataService){}
}
