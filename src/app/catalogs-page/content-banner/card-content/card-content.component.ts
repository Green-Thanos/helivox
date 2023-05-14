import { Component, Input} from '@angular/core';
import { DataService } from 'src/app/shared/dta.service';

@Component({
  selector: 'card-content',
  templateUrl: './card-content.component.html',
  styleUrls: ['./card-content.component.css']
})
export class CardContentComponent {

  dummyData = [{
    title: "Environmental Science AP",
    tags: [ "5", "0"],
    labels: ["Science"],
    image: "https://resources.finalsite.net/images/f_auto,q_auto,t_image_size_2/v1544015049/troyk12mius/qhymxhcjvmy6darpzpnb/TroyHighHero.jpg",
    description: `Students will explore and investigate the interrelationships of the natural world and analyze environmental problems, both natural and human-made. Topics will include Ecosystems, Biodiversity, Populations, Earth Systems and Resources, Land and Water Use, Energy and Resources, Pollution and Global Change. Laboratory investigations and field work are integral components of this course. This course is designed to prepare students for the College Board exam in the Spring.
    Skills you will learn:
    · Explaining environmental concepts and processes
    · Analyzing data, visual representations, and writings
    · Applying quantitative methods in solving problems
    · Proposing a solution for an environmental problem and supporting your idea with evidence
    · Analyzing a research study to identify a hypothesis`,
    comments: [["AntHill Baboon Kabir", "Hey How is it going? I actually feed the turtles straws!"], ["H.E.L.P", "What an Environmentalist!"]]
  }, 
  {
    title: "Physics 2 AP",
    tags: ["3", "1"],
    labels: ["Math"], 
    image: "https://repository-images.githubusercontent.com/260096455/47f1b200-8b2e-11ea-8fa1-ab106189aeb0",
    description: `Random Description`,
    comments: []
  }]

  
  @Input() selected: string;
  @Input() activeFilters: string[];
  @Input() searchText: string;

  isOpen: boolean = false;
  openedCatalog: number;

  openModal(i: number){
    this.openedCatalog = i;
    this.isOpen = true;
    
  }
  closeModal(){
    this.isOpen = false;
  }
  constructor(private data: DataService){}
}
