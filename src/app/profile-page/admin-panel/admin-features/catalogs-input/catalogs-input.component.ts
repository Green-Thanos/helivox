import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/services/dta.service';

@Component({
  selector: 'catalogs-input',
  templateUrl: './catalogs-input.component.html',
  styleUrls: ['./catalogs-input.component.css']
})
export class CatalogsInputComponent {
  catalogsData = this.dta.getCatalogs();
  constructor(private dta: DataService){}
}
