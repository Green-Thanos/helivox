import { Component, Input, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/shared/dta.service';

@Component({
  selector: 'card-content',
  templateUrl: './card-content.component.html',
  styleUrls: ['./card-content.component.css']
})
export class CardContentComponent implements OnInit, OnDestroy {

  @Input() selected: string;
  @Input() activeFilters: string[];
  @Input() searchText: string;
  @Input("catalogCategory") catalogCategory;

  catalogData = []

  isOpen: boolean = false;
  openedCatalog: number;

  isAdmin = this.data.getAdminStatus();
  adminSubscription: Subscription;

  unloaded = true;
  subscription: Subscription;


  ngOnInit(): void {


    // If they change the catalog data on the page 
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.unloaded = true;
      this.data.getData(this.catalogCategory.catalog).then((snapshot) => {
        this.catalogData = snapshot.docs;
        this.unloaded = false;
      }).catch( err => {
          console.log(err.message)
          this.unloaded = false;
      });

    })

    this.data.getData(this.catalogCategory.catalog).then((snapshot) => {
      this.catalogData = snapshot.docs;
      this.unloaded = false;
    }).catch( err => {
        console.log(err.message)
        this.unloaded = false;
    });



    this.adminSubscription = this.data.adminCheck.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    })

  }

  ngOnDestroy(): void {
    this.adminSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }



  openModal(i: number){
    this.openedCatalog = i;
    this.isOpen = true;
    
  }
  closeModal(){
    this.isOpen = false;
  }

  passesTags(i: number){
    if(this.catalogData[i].data().school !== this.catalogCategory.school){
      return false;
    }
    if(!this.catalogData[i].data().title.toLowerCase().includes(this.searchText.toLowerCase())){
      return false;
    }
    if(this.catalogData[i].data().category.toLowerCase() !== this.selected.toLowerCase()){
      return false;
    }
    if(!(this.catalogData[i].data().labels.includes(this.activeFilters[2])) && this.activeFilters[2] != "Tags"){
      return false
    }
    if(!this.checkIfInRange(this.activeFilters[0], this.catalogData[i].data().tags[0])  && this.activeFilters[0] != "Hours"){
      return false;
    }
    if(this.activeFilters[1] != "Cost" && !this.checkIfInRange(this.activeFilters[1], this.catalogData[i].data().tags[1]) ){
      return false;
    }

    if((this.activeFilters[3] != "Rating" && this.catalogData[i].data().rating === undefined)){
      return false;
    }
    else{
      if((this.activeFilters[3] === "Outstanding") && !(this.catalogData[i].data().rating >= 4)){
        return false
      }
      if((this.activeFilters[3] === "Superior") && !(this.catalogData[i].data().rating >= 3 && this.catalogData[i].data().rating < 4)){
        return false
      }
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


  constructor(private data: DataService, private route: ActivatedRoute){}
}
