import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CatalogData } from './catalog-data';


@Injectable({providedIn: 'root'})
export class DataService {

    // Catalogs Page

    catalogs = ["Courses", "Clubs"];
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
        0: ["0", "1-5", "6-10", "10+"],
        1: ["$0", "$1-20", "$20-50", "$50+"],
        2: this.getTags("STEM"),
        3: ['Superior', 'Outstanding']
      }
    
    defaultTags = ["Hours", "Cost", "Tags", "Rating"];
    types = ["STEM", "SPORTS", "ARTS", "MISC"];

    userRatingOptions = ['Unacceptable', 'Subpar', 'Standard', 'Superior', 'Outstanding'];

    checkIfUserResubmitRating = [];

    // Front page

    statVal = ['67', '94', '2'];
    statText = ['Are goofy', 'Hate HS', 'Like Glynn'];


    // Getters for all variables

    getUserRatingOptions(){
        return this.userRatingOptions.slice();
    }

    addUserRatingLog(index: number){
        this.checkIfUserResubmitRating.push(index);
    }
    
    checkIfResubmit(index: number){
        return this.checkIfUserResubmitRating.includes(index);
    }

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

    // Http Request Methods

    postData(newDta: any, fileName: String){
        this.http.put('https://helivox-2-default-rtdb.firebaseio.com/' + fileName + '.json', JSON.stringify(newDta)).subscribe(() => {});
    }

    getData(filename: String){
        return this.http.get('https://helivox-2-default-rtdb.firebaseio.com/' + filename + '.json')
    }

    constructor(private http: HttpClient){}

}