import { Component, Input } from '@angular/core';
import { DataService } from 'src/app/shared/dta.service';

@Component({
  selector: 'content-banner',
  templateUrl: './content-banner.component.html',
  styleUrls: ['./content-banner.component.css']
})
export class ContentBannerComponent {

  @Input("data") catalogData = [];
  @Input("catalogCategory") catalogCategory;

  activeFilters = this.data.getDefaultTags();
  selected = this.data.getTypes()[0];
  searchText = "";
  
  recordCategory(selected: string){
    this.selected = selected;
  }

  parseFilters(activeFilters: string[]){
    this.activeFilters = activeFilters;
  }

  parseSearch(searchText: string){
    this.searchText = searchText;
  }

  constructor(private data: DataService){}
}
