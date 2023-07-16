import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

interface AuthResponseData{
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
}

@Injectable({providedIn: 'root'})
export class AuthService {

    signup(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDXcpYQ9XHpJSRyhhqJgRx4Mc99eh_MeLE', 
        {
            email: email,
            password: password,
            returnSecureToken: true
        })
    }

    constructor(private http: HttpClient){}
    
}