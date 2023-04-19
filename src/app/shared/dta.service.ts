import { Injectable } from '@angular/core'

@Injectable({providedIn: 'root'})
export class DataService {

    catalogs = ["Courses", "Clubs", "Extracurriculars"];
    schools = {
        "Michigan": ["Troy High School", "International Academy High School", "Cranbrook High School"],
        "Test": ["Test1", "Test2", "Test3", "Test1", "Test2", "Test3"]
    };

    getCatalogs(){
        return this.catalogs.slice();
    }

    getStates(){
        return Object.keys(this.schools)
    }

    getSchools(state: any){
        return this.schools[state];

    }

}