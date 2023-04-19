import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { DropdownService } from 'src/app/shared/dropdown.service';
import { DataService } from 'src/app/shared/dta.service';

@Component({
  selector: 'phone-dropdown',
  templateUrl: './phone-dropdown.component.html',
  styleUrls: ['./phone-dropdown.component.css']
})
export class PhoneDropdownComponent implements OnInit{

  catalogs = [];
  states = [];
  schools = [];

  currentCatalog = 0;
  currentState = 0;


  clicked = false;

  @Output() close = new EventEmitter<null>();

  ngOnInit(): void {
    this.catalogs = this.dta.getCatalogs();
    this.states = this.dta.getStates();
    this.schools = this.dta.getSchools(this.states[0]);
  }

  
  closeDropdown(){
    this.close.emit();
    this.dpdnService.update(false);
  }

  changeSchool(){
    this.schools = this.dta.getSchools(this.states[this.currentState]);

  }

  constructor(private dta: DataService, private dpdnService: DropdownService){}
}

