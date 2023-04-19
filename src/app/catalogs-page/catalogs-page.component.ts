import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/dta.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'catalogs-page',
  templateUrl: './catalogs-page.component.html',
  styleUrls: ['./catalogs-page.component.css']
})
export class CatalogsPageComponent implements OnInit {

  catalogData: {catalog: string, state: string, school: string};

  ngOnInit(): void {
    this.catalogData = {
      catalog: this.dta.catalogs[this.route.snapshot.params["catalog"]],
      state: this.dta.getStates()[this.route.snapshot.params["state"]],
      school: this.dta.getSchools(this.dta.getStates()[this.route.snapshot.params["state"]])[this.route.snapshot.params["school"]]
    };
    this.route.params.subscribe((params: Params) => {
      this.catalogData.catalog = this.dta.catalogs[params["catalog"]],
      this.catalogData.state = this.dta.getStates()[params["state"]],
      this.catalogData.school = this.dta.getSchools(this.dta.getStates()[params["state"]])[params["school"]]
    })
  }

  constructor(private dta: DataService, private route: ActivatedRoute){}
}
