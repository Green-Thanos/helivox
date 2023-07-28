import { Injectable, EventEmitter } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';
import { User } from '../templates/user';


@Injectable({providedIn: 'root'})
export class DataService {

    user = new User("", "", "", new Date(), -1);
    editMode = false;

    // Alert auxilary variables

    alertText = '';
    alertIsOpen = false;
    alertColor = ''


    // Catalogs Page

    catalogs = ["Courses", "Clubs"];
    schools = {
        "Michigan": ["Troy High School", "International Academy High School", "Cranbrook High School"],
        "Georgia": ["John's Creek High School"]
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

    statVal = ['83', '75', '69', '21', '95', ];
    statText = ['of teens identify school as a major stress factor - 2017 APA Stress Survey', 
    "of high school graduates do not feel adequately prepared to make college and career decisions - YouScience 'Post Graduation Readiness Report'",
    'of teens say getting into a good college is a major stress factor - 2017 APA Stress Survey', 
    'was the percentage increase in college applications between the 2019-2020 and the 2021-2022 school year - Department of Education, NCES College Enrollment Rates',
    'of Americans support US High School Students having more academic opportunities and choices - State of the Skills Gap: Perceptions of the role high school plays in preparing students for success in career - 2023 Edge Research and K12 Inc',
    ];

    carouselImages = ['https://raw.githubusercontent.com/Firingsniper/Helivox-stuff/main/Seminar%20Highlights%20opp%20slide.png', 'https://raw.githubusercontent.com/Firingsniper/Helivox-stuff/main/Corrected%20Prof%20Network%20Carousel.png'];

    // Getters for all variables
    get editorMode(){
        return this.editMode;
    }

    setEditMode(editMode: boolean){
        this.editMode = editMode;
    }

    setUser(user: User){
        this.user = user;
    }

    getUser(){
        return this.user;
    }

    getAlertText(){
        return this.alertText;
    }

    setAlertData(text: string, status: boolean, color: string){
        this.alertText = text;
        this.alertColor = color;
        this.alertIsOpen = status;
    }

    getAlertStatus(){
        return this.alertIsOpen;
    }

    getAlertColor(){
        return this.alertColor;
    }



    getCarousel(){
        return this.carouselImages.slice();
    }

    addCarousel(img: string){
        this.carouselImages.push(img);

        // send to backend
    }

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
        
        this.http.put('https://helivox-2-default-rtdb.firebaseio.com/' + fileName + '.json?auth=' + this.user.token, JSON.stringify(newDta)).subscribe(() => {});
        

        // this.http.put('https://helivox-2-default-rtdb.firebaseio.com/' + fileName + '.json', JSON.stringify(newDta)).subscribe(() => {});

    }

    getData(filename: String){
        return this.http.get('https://helivox-2-default-rtdb.firebaseio.com/' + filename + '.json');
    }

    patchData(newDta: any, fileName: String){
            this.http.patch('https://helivox-2-default-rtdb.firebaseio.com/' + fileName + '.json?auth=' + this.user.token, JSON.stringify(newDta)).subscribe(() => {});
    }

    deleteData(name: string, filename: string){
            this.http.delete('https://helivox-2-default-rtdb.firebaseio.com/' + filename + '/' + name + '.json?auth=' + this.user.token).subscribe(() => {})
    }

 
    constructor(private http: HttpClient){}


}