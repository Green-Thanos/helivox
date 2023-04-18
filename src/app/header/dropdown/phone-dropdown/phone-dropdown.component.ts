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

  @Output() close = new EventEmitter<null>();

  ngOnInit(): void {
    // TEMPORARY UNTIL NGFORMS ARE IMPLEMENTED
    this.catalogs = this.dta.getCatalogs();
    this.states = this.dta.getStates();
    this.schools = this.dta.getSchools(this.states[0]);
  }

  
  closeDropdown(){
    this.close.emit();
    this.dpdnService.buttonEmitterCancelled.emit(false);
  }

  constructor(private dta: DataService, private dpdnService: DropdownService){}
}

