import { HttpClient } from "@angular/common/http";


interface UserResponseData{
    users: [{
        emailVerified: boolean
    }]
}

export class User{

    constructor(
        public email: string, 
        public id: string, 
        private _token: string, 
        private _tokenExpirationDate: Date,
        private _role: number
    ){}



    // Getters


    get token() {
        if(!this._tokenExpirationDate || (new Date() > this._tokenExpirationDate)){
            return null;
        }
        return this._token;
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
    
 }