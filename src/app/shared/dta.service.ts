import { Injectable } from '@angular/core'

@Injectable({providedIn: 'root'})
export class DataService {

    catalogs = ["Courses", "Clubs", "Extracurriculars"];
    schools = {
        "Michigan": ["Troy High School", "International Academy High School", "Cranbrook High School"]
    };

    getCatalogs(){
        return this.catalogs.slice();
    }

    getStates(){
        return Object.keys(this.schools)
    }

    getSchools(state){
        return this.schools[state];

    }

}