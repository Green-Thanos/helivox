import { Component, Output, EventEmitter, Input, ViewChild, HostListener, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { CatalogData } from '../../../../shared/catalog-data';
import { DataService } from 'src/app/shared/dta.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {



  // Form portion
  catalogForm: FormGroup;


  @Input() filters: any;
  @Input() selected: String;
  @Input() allCatalogData: CatalogData[];


  isAdmin = this.dta.getAdminStatus();

  adminSubscription: Subscription;

    //Presets

  title = null;
  hrs = null;
  cost = null;
  desc = null;
  image = null;
  link = "na"

  tagPreselect1 = null;
  tagPreselect2 = null;
  tagPreselect3 = null;


  submitElement(){
    const labelsVal = [this.catalogForm.value.tag1]
    if(this.catalogForm.value.tag2 !== null){ labelsVal.push(this.catalogForm.value.tag2)}
    if(this.catalogForm.value.tag3 !== null){ labelsVal.push(this.catalogForm.value.tag3)}
    let newDta: CatalogData;
    newDta = {
      category: this.selected.toLowerCase(),
      description: this.catalogForm.value.description,
      image: this.catalogForm.value.image,
      labels: labelsVal,
      link: this.catalogForm.value.link,
      school: this.filters.school,
      tags: [this.catalogForm.value.hours, this.catalogForm.value.cost],
      title: this.catalogForm.value.title,
      comments: null,
      rating: null
    }

    if(this.index === -1){
      this.allCatalogData.push(newDta);
    }
    else{
      this.allCatalogData[this.index] = newDta;
    }
    this.dta.postData(this.allCatalogData, this.filters.catalog );
    this.ngOnInit();

    this.openEvent.emit(true);

  }

  deleteElement(){
    this.allCatalogData.splice(this.index, 1);
    this.dta.postData(this.allCatalogData, this.filters.catalog);
    
    this.ngOnInit();

    this.openEvent.emit(true);
  }


  // Description portion

  isOpen = true;
  notToggled = false;

  commentsToggled = false;

  userRating = -1;
  userRatingOptions = this.dta.getUserRatingOptions();
  openDropDown = false;





  @ViewChild('comments') comments: string;

  @Input() data: CatalogData;
  @Input() index: number;

  @Output() openEvent = new EventEmitter<boolean>();
  @Output() newRating = new EventEmitter<number[]>();




  resubmit = false;

  check(){
    if(!this.notToggled && this.isOpen){
      this.openEvent.emit(true);
      
    }

    this.notToggled = false;
  }


  pushComments(){
    if(this.data.comments === undefined){
      this.data.comments = [["Anonymous", this.comments]];
    }
    else{
      this.data.comments.push(["Anonymous", this.comments]);
    }

    this.comments = '';
  }

  parseRating(rating: number){
    this.newRating.emit([this.index, rating]);
    this.openDropDown = false;
    this.dta.addUserRatingLog(this.index);
  }

  // Global Portion 

  constructor(private dta: DataService, private elementRef: ElementRef){}

  ngOnInit(): void {
    this.resubmit = this.dta.checkIfResubmit(this.index);
    this.adminSubscription = this.dta.adminCheck.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    })

    if(this.index !== -1 ){
        this.title = this.data.title;
        this.hrs = this.data.tags[0];
        this.cost = this.data.tags[1];
        this.link = this.data.link;
        this.desc = this.data.description;
        this.image = this.data.image;

        this.tagPreselect1 = this.data.labels[0];
        this.tagPreselect2 = this.data.labels[1];
        this.tagPreselect3 = this.data.labels[2];
    }

    this.catalogForm = new FormGroup({
      'title': new FormControl(this.title, Validators.required),
      'hours': new FormControl(this.hrs, Validators.required),
      'cost': new FormControl(this.cost, Validators.required),
      'tag1': new FormControl(this.tagPreselect1, Validators.required),
      'tag2': new FormControl(this.tagPreselect2),
      'tag3': new FormControl(this.tagPreselect3),
      'link': new FormControl(this.link, Validators.required),
      'image': new FormControl(this.image, Validators.required),
      'description': new FormControl(this.desc, Validators.required)
    })
  }

  ngOnDestroy(): void {
    this.adminSubscription.unsubscribe();
  }
  
}
