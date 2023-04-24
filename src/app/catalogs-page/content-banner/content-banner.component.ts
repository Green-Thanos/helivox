import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/dta.service';

@Component({
  selector: 'content-banner',
  templateUrl: './content-banner.component.html',
  styleUrls: ['./content-banner.component.css']
})
export class ContentBannerComponent {

  activeFilters = this.data.getDefaultTags();
  selected = this.data.getTypes()[0];
  
  recordCategory(selected: string){
    this.selected = selected;
  }

  parseFilters(activeFilters: string[]){
    this.activeFilters = activeFilters;
  }

  constructor(private data: DataService){}
}
