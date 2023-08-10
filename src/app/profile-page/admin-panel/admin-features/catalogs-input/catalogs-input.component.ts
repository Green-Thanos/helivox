import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/services/dta.service';

@Component({
  selector: 'catalogs-input',
  templateUrl: './catalogs-input.component.html',
  styleUrls: ['./catalogs-input.component.css']
})
export class CatalogsInputComponent {
  catalogsData = this.dta.getCatalogs();
  newData = '';
  confirmationModal = false;
  submit(){
    this.confirmationModal = true;
  }

  checkConfirmation(confirmation: boolean){
    if(confirmation){
      if(this.newData !== ""){
        this.catalogsData.push(this.newData);
        this.newData = '';
      }
      this.catalogsData = this.catalogsData.filter((str) => str !== '');
      this.submitToDatabase(this.catalogsData);
    }
    this.confirmationModal = false;

    
  }

  submitToDatabase(catalogsData: any){
    this.dta.patchData({
      catalogs: catalogsData
    }, 'Admin')
    this.dta.setCatalogs(catalogsData);
  }

  trackByFn(index: any, item: any) {
    return index;
 }
  constructor(private dta: DataService){}
}
