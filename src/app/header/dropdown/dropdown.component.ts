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

  currentCatalog = 0;
  currentState = 0;


  ngOnInit(): void {
    this.catalogs = this.dta.getCatalogs();
    this.states = this.dta.getStates();
    this.schools = this.dta.getSchools(this.states[this.currentState]);
  }

  changeSchool(){
    this.schools = this.dta.getSchools(this.states[this.currentState]);

  }

  constructor(private dta: DataService){}


}
