import { HttpClient } from "@angular/common/http";




export class User{

    constructor(
        public email: string, 
        public id: string, 
        private _token: string, 
        private _tokenExpirationDate: Date,
        private _role: number,
        private _profile_picture: string
    ){}

    // Setters

    set profile_picture(pfp: string) {
        this._profile_picture = pfp;
    }



    // Getters


    get token() {
        if(!this._tokenExpirationDate || (new Date() > this._tokenExpirationDate)){
            return null;
        }
        return this._token;
    }

    get profile_picture() {
        if(!this._tokenExpirationDate || (new Date() > this._tokenExpirationDate)){
            return '../../assets/anonymous.png';
        }
        return this._profile_picture;
        
    }

    get uid(){
        if(!this._tokenExpirationDate || (new Date() > this._tokenExpirationDate)){
            return null;
        }
        return this.id;
    }

    get role(){
        return this._role;
    }

    get tokenExpirationDate(){
        return this._tokenExpirationDate;
    }

    getUsername(){
        return this.email.split('@')[0];
    }
    
 }