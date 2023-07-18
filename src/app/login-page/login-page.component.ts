import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, NgForm, ValidationErrors, ValidatorFn, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { DataService } from '../shared/services/dta.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  signup = false;
  loginForm: FormGroup;
  signupForm: FormGroup;
  verifyEmail = false;

  unloaded = false;

  authSubscription: Subscription;
  verificationSubscription: Subscription;
  deleteUserSubscription: Subscription;
  deleteAuthSubscription: Subscription;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    })

    this.signupForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.email]),
      'passwordData': new FormGroup({
        'password1': new FormControl(null, [Validators.required, Validators.minLength(6)]),
        'password2': new FormControl(null, Validators.required)
      }, {validators: this.passwordCheck})

    })
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
    this.verificationSubscription.unsubscribe();
    this.deleteUserSubscription.unsubscribe();
    this.deleteAuthSubscription.unsubscribe();
  }

  onSubmitLogin(){

    if(!this.loginForm.valid){
      return;
    }
    this.unloaded = true;
    this.authSubscription = this.auth.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(resData => {
      this.verificationSubscription = this.auth.fetchUserData(resData.idToken).subscribe(userData => {
        if(userData.users[0].emailVerified != true){
          alert("User not verified: re-signup");
          // Delete user if user is not verified
          this.deleteAuthSubscription = this.auth.deleteUser(resData.idToken).subscribe(() => {});
          this.deleteUserSubscription = this.dta.deleteData(resData.localId, "Users").subscribe(() => {});
          this.unloaded = false;
          return
        }
        this.unloaded = false;
        alert('login success');
        console.log(resData);
        this.router.navigate([""]);

      })
    }, error => {


      alert(error.error.error.message)
      console.log(error);
      
      this.unloaded = false;
    });

    // console.log(this.loginForm.value);
    this.loginForm.reset();
  }

  onSubmitSignup(){
    if(!this.signupForm.valid){
      return;
    }
    this.unloaded = true;
    this.authSubscription = this.auth.signup(this.signupForm.value.username, this.signupForm.value.passwordData.password1).subscribe(resData => {
      this.verifyEmail = true;
      this.verificationSubscription = this.auth.verification(resData.idToken).subscribe(() => {
        this.verifyEmail = false;
        let newUser = {}
        newUser[resData.localId] = {
          role: "0",
          email: resData.email,
          token: resData.localId
        }
        this.dta.patchData(newUser, "Users")
        this.unloaded = false;
        this.signup = false;

      })

    }, error => {
      if(error.status === 400){
        alert("This user already exists!");
      }
      else{
        alert(error.error.error.message)
        console.log(error);
      }
      this.unloaded = false;
    });
    this.signupForm.reset();
    // this.router.navigate([""]);
  }

  resetPassword(){
    alert('not setup yet')
  }



  passwordCheck(control: FormControl): {[s: string]: boolean} {
    if(control.value.password1 !== control.value.password2) {
      return {'Match': true};
    }
    return null;
  }

  constructor(private router: Router, private auth: AuthService, private dta: DataService){

  }

}
