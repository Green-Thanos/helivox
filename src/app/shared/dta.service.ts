import { Injectable } from '@angular/core'

@Injectable({providedIn: 'root'})
export class DataService {

    catalogs = ["Courses", "Clubs", "Extracurriculars"];
    schools = {
        "Michigan": ["Troy High School", "International Academy High School", "Cranbrook High School"],
        "Test": ["Test1", "Test2", "Test3", "Test1", "Test2", "Test3"]
    };
    tags = {
        "STEM": ["Science", "Med", "Math", "CS", "Technology", "Standardized Testing"],
        "SPORTS": ["Boys", "Girls", "Winter", "Spring", "Fall", "Dance", "Swim", "Personal Fitness", "Self Defense"],
        "ARTS": ["Art", "Lit", "Pub. Speaking", "Lang/Culture", "Drama", "Music", "Film"],
        "MISC": ["Business", "Volunteering", "Religion", "Social Studies", "Life Skills", "Trade-Specific", "Trivia"]
    }

    // Referenced by default tags
    filtrationData = {
        0: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
        1: ["0", "1-5", "6-10", "10+"],
        2: ["$0", "$1-20", "$20-50", "$50+"],
        3: this.getTags("STEM")
      }
    
    defaultTags = ["Rating", "Hours", "Cost", "Tags"];
    types = ["STEM", "SPORTS", "ARTS", "MISC"];

    // Front page

    // Stats

    statVal = ['67', '94', '2'];
    statText = ['Are goofy', 'Hate HS', 'Like Glynn'];

    getStatVal(){
        return this.statVal.slice();
    }

    getStatText(){
        return this.statText.slice();
    }

    getCatalogs(){
        return this.catalogs.slice();
    }

    getStates(){
        return Object.keys(this.schools)
    }

    getSchools(state: any){
        return this.schools[state];

    }

    getTags(desc: string) {
        return this.tags[desc]
    }

    getDefaultTags(){
        return this.defaultTags.slice();
    }

    getTypes() {
        return this.types.slice()
    }

}