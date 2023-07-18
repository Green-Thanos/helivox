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

interface UserResponseData{
    users: [{
        emailVerified: boolean
    }]
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

    verification(idToken: string){
        return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDXcpYQ9XHpJSRyhhqJgRx4Mc99eh_MeLE', 
        {
            requestType: 'VERIFY_EMAIL',
            idToken: idToken

        })
    }
    
    login(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDXcpYQ9XHpJSRyhhqJgRx4Mc99eh_MeLE', 
        {
            email: email,
            password: password,
            returnSecureToken: true
        })
    }

    fetchUserData(idToken: string){
        return this.http.post<UserResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDXcpYQ9XHpJSRyhhqJgRx4Mc99eh_MeLE', 
        {
            idToken: idToken
        })
    }

    deleteUser(idToken: string){
        return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyDXcpYQ9XHpJSRyhhqJgRx4Mc99eh_MeLE', 
        {
            idToken: idToken
        })
    }

    constructor(private http: HttpClient){}
    
}