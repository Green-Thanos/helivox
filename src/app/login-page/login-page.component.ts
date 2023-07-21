import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, NgForm, ValidationErrors, ValidatorFn, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { DataService } from '../shared/services/dta.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  signupForm: FormGroup;
  emailResetForm: FormGroup;
  invalidPassword = false;

  activePopup = "login";

  unloaded = false;

  authSubscription: Subscription;
  verificationSubscription: Subscription;
  deleteUserSubscription: Subscription;
  deleteAuthSubscription: Subscription;
  sendResetCodeSubscription: Subscription;

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

    this.emailResetForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.email]),
    })
  }

  ngOnDestroy(): void {
    if(this.authSubscription){
      this.authSubscription.unsubscribe();
      this.verificationSubscription.unsubscribe();
    }
    if(this.deleteUserSubscription){
      this.deleteUserSubscription.unsubscribe();
      this.deleteAuthSubscription.unsubscribe();
    }
    if(this.sendResetCodeSubscription){
      this.sendResetCodeSubscription.unsubscribe();
    }

  }

  onSubmitLogin(){

    if(!this.loginForm.valid){
      return;
    }
    this.unloaded = true;
    this.authSubscription = this.auth.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(resData => {
      this.verificationSubscription = this.auth.fetchUserData(resData.idToken).subscribe(userData => {
        if(userData.users[0].emailVerified != true){
          this.dta.setAlertData('User not verified: Re-signup', true, '#e65045');
          // Delete user if user is not verified
          this.deleteAuthSubscription = this.auth.deleteUser(resData.idToken).subscribe(() => {});
          this.deleteUserSubscription = this.dta.deleteData(resData.localId, "Users").subscribe(() => {});
          this.unloaded = false;
          return
        }
        this.unloaded = false;
        this.dta.setAlertData('Login Success!', true, '#07E607');
        console.log(resData);
        this.router.navigateByUrl('');

      })
    }, error => {
      if(error.status === 400){
        this.invalidPassword = true;
      }
      else{
        this.dta.setAlertData(error.error.error.message, true, '#e65045');

        console.log(error);
      }

      this.unloaded = false;

    });
    this.loginForm.reset();
  }

  onSubmitSignup(){
    if(!this.signupForm.valid){
      return;
    }
    this.unloaded = true;
    this.authSubscription = this.auth.signup(this.signupForm.value.username, this.signupForm.value.passwordData.password1).subscribe(resData => {
      this.verificationSubscription = this.auth.verification(resData.idToken).subscribe(() => {
        let newUser = {}
        newUser[resData.localId] = {
          role: "0",
          email: resData.email,
          token: resData.localId
        }
        this.dta.patchData(newUser, "Users")
        this.unloaded = false;
        this.activePopup = 'email_verification'
      })

    }, error => {
      if(error.status === 400){
        this.dta.setAlertData("This user already exists!", true, '#e65045');
        
      }
      else{
        this.dta.setAlertData(error.error.error.message, true, '#e65045');
        console.log(error);
      }
      this.unloaded = false;

    });
    this.signupForm.reset();

    // this.router.navigate([""]);
  }

  resetPassword(){
    this.activePopup = 'reset_password_email'
  }
  
  onSubmitEmailReset(){
    if(!this.emailResetForm.valid){
      return;
    }
    this.unloaded = true;
    this.sendResetCodeSubscription = this.auth.sendPasswordResetCode(this.emailResetForm.value.username).subscribe(()=>{
      this.dta.setAlertData('A reset email has been sent', true, '#07E607');

      this.emailResetForm.reset();
      this.activePopup = 'login';
      this.unloaded = false;
    }, error => {
      this.dta.setAlertData(error.error.error.message, true, '#e65045');
      this.unloaded = false;
    });
  }

  confirmEmailVerified(){
    this.activePopup = "login";
  }

  passwordCheck(control: FormControl): {[s: string]: boolean} {
    if(control.value.password1 !== control.value.password2) {
      return {'Match': true};
    }
    return null;
  }

  constructor(private router: Router, private auth: AuthService, private dta: DataService, private route: ActivatedRoute){

  }

}
