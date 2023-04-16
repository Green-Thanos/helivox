import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/dta.service';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  catalogs = [];
  states = [];
  schools = [];

  ngOnInit(): void {
    // TEMPORARY UNTIL NGFORMS ARE IMPLEMENTED
    this.catalogs = this.dta.getCatalogs();
    this.states = this.dta.getStates();
    this.schools = this.dta.getSchools(this.states[0]);
  }

  constructor(private dta: DataService){}


}
