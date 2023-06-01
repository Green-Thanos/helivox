import { Component, ElementRef, HostListener, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import { DataService } from 'src/app/shared/dta.service';

@Component({
  selector: 'sort-panel',
  templateUrl: './sort-panel.component.html',
  styleUrls: ['./sort-panel.component.css']
})
export class SortPanelComponent{
  selectedFilter = -1;

  @Input("selected") selectedCategory: string;
  @Output() exportFilters = new EventEmitter<string[]>();
  @Output() exportSearch = new EventEmitter<string>();

  searchText: string = "";

  filtrationData = this.dta.filtrationData;

  activeFilters = this.dta.getDefaultTags();

  // When user clicks out of dropdown, close dropdown
  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.selectedFilter = -1;
    }
  }

  // When the input (selected category like stem) changes, update tags list
  ngOnChanges(changes: SimpleChanges): void {
    this.filtrationData[2] = this.dta.getTags(this.selectedCategory);
    this.reset();
  }

  changeFilters(type: number, index: number){
    this.activeFilters[type] = this.filtrationData[type][index];
    console.log(this.activeFilters);
    this.exportFilters.emit(this.activeFilters);
    this.selectedFilter = -1;
  }

  onSearchChange(){
    this.exportSearch.emit(this.searchText.toLowerCase());
  }

  reset() {
    this.activeFilters = this.dta.getDefaultTags(); 
    this.searchText = "";
    this.exportSearch.emit(this.searchText.toLowerCase());
    this.exportFilters.emit(this.activeFilters);
  }

  constructor(private elementRef: ElementRef, private dta: DataService){}

}
