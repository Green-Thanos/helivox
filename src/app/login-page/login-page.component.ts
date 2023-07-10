import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, NgForm, ValidationErrors, ValidatorFn, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  signup = false;
  loginForm: FormGroup;
  signupForm: FormGroup;

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

  onSubmitLogin(){
    console.log(this.loginForm.value);
    this.loginForm.reset();
    this.router.navigate([""]);
  }

  onSubmitSignup(){
    console.log(this.signupForm.value);
    this.signupForm.reset();
    this.router.navigate([""]);
  }



  passwordCheck(control: FormControl): {[s: string]: boolean} {
    if(control.value.password1 !== control.value.password2) {
      return {'Match': true};
    }
    return null;
  }

  constructor(private router: Router){

  }

}
