import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/dta.service';

@Component({
  selector: 'content-banner',
  templateUrl: './content-banner.component.html',
  styleUrls: ['./content-banner.component.css']
})
export class ContentBannerComponent implements OnInit{

  @Input("catalogCategory") catalogCategory;

  activeFilters = this.data.getDefaultTags();
  selected = this.data.getTypes()[0];
  searchText = "";

  isAdmin = this.data.getAdminStatus();

  ngOnInit(): void {
    this.data.adminCheck.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    })
  }
  
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
