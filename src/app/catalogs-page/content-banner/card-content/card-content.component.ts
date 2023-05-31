import { Component, Input} from '@angular/core';
import { DataService } from 'src/app/shared/dta.service';

@Component({
  selector: 'card-content',
  templateUrl: './card-content.component.html',
  styleUrls: ['./card-content.component.css']
})
export class CardContentComponent {

  @Input() selected: string;
  @Input() activeFilters: string[];
  @Input() searchText: string;
  @Input("data") catalogData = []
  @Input("catalogCategory") catalogCategory;

  isOpen: boolean = false;
  openedCatalog: number;

  openModal(i: number){
    this.openedCatalog = i;
    this.isOpen = true;
    
  }
  closeModal(){
    this.isOpen = false;
  }

  passesTags(i: number){
    if(this.catalogData[i].school !== this.catalogCategory.school){
      return false;
    }
    if(!this.catalogData[i].title.toLowerCase().includes(this.searchText.toLowerCase())){
      return false;
    }
    if(this.catalogData[i].category.toLowerCase() !== this.selected.toLowerCase()){
      return false;
    }
    if(!(this.catalogData[i].labels.includes(this.activeFilters[2])) && this.activeFilters[2] != "Tags"){
      return false
    }
    if(!this.checkIfInRange(this.activeFilters[0], this.catalogData[i].tags[0])  && this.activeFilters[0] != "Hours"){
      return false;
    }
    if(this.activeFilters[1] != "Cost" && !this.checkIfInRange(this.activeFilters[1], this.catalogData[i].tags[1]) ){
      return false;
    }

    return true;
  }

  checkIfInRange(range: String, value: number){
    if(range.includes("+")){
      range = range.replace("$", "").replace("+" , "");
      if(value > Number(range)){
        return true;
      }
      return false;
    }
    else if(range.includes("-")){
      const setOfVals = range.split("-");
      setOfVals[0] = setOfVals[0].replace("$", "");

      if(value >= Number(setOfVals[0]) && value <= Number(setOfVals[1])){
        return true;
      }
    }
    else{
      if(value === Number(range.replace("$", ""))){
        return true;
      }
    }
    
    return false;
  }
  constructor(private data: DataService){}
}
