import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/dta.service';

@Component({
  selector: 'about-us-page',
  templateUrl: './about-us-page.component.html',
  styleUrls: ['./about-us-page.component.css']
})
export class AboutUsPageComponent implements OnInit{
  order = []
  list = [1, 7, 0];

  admins: any;
  editors: any;
  volunteers: any;

  exec = [];
  heads = [];
  alumni = [];

  ngOnInit(): void {
    setTimeout(() => {
      this.admins = this.dta.getAbout().Admin;
      this.editors = this.dta.getAbout().Editor;
      this.volunteers = this.dta.getAbout().Volunteer;
      for(let i = 0; i < this.admins.length; i++){
        if(this.admins[i].category === "Executive"){
          this.exec.push(this.admins[i])
        }
        else if (this.admins[i].category === "Alumni"){
          this.alumni.push(this.admins[i])
        }
        else {
          this.heads.push(this.admins[i])
        }
      }
      console.log(this.alumni)
      console.log(this.exec)
      this.reorder();
    }, 200)
  }
  reorder(){
    this.exec.splice(3, 0 , this.exec[0]);
    this.exec.push(this.exec[4]);
    this.exec.splice(4,1)
    this.exec.splice(0,1)

  }

  constructor(private dta: DataService){}
}
