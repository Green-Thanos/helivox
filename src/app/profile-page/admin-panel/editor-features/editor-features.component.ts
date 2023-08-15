import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/services/dta.service';

@Component({
  selector: 'editor-features',
  templateUrl: './editor-features.component.html',
  styleUrls: ['./editor-features.component.css']
})
export class EditorFeaturesComponent {
  user = this.dta.getUser();

  name = this.user.name;

  submitName(){
    const list = this.dta.getAbout();
    if(list.Member.indexOf(this.user.name) !== -1){
      list.Member.splice(list.Member.indexOf(this.user.name), 1, this.name);
    }
    else{
      list.Member.push(this.name);
    }
    this.dta.getUser().name = this.name;
    this.dta.postData(list.Member, 'About/Editor');
    this.dta.patchData({name: this.name}, "Users/" + this.user.uid);
    this.dta.setAbout(list)
    this.dta.setAlertData('Success!', true, '#07E607');

  }


  constructor(private dta: DataService){}
}
