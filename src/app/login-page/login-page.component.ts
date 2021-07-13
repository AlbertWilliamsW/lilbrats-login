import { Component, OnInit } from '@angular/core';
import { WindowService } from '../window.service';
// import * as firebase from 'firebase';

import * as firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  windowRef: any;
  phoneNumber: string;
  verificationCode: string;
  user: any; 
  error:string;
   firebaseConfig = {
    apiKey: "AIzaSyAzf7UaObV1aRz9GOubAXM_x_-Ku4OI9aY",
    authDomain: "example-login-ca270.firebaseapp.com",
    databaseURL: "https://example-login-ca270-default-rtdb.firebaseio.com",
    projectId: "example-login-ca270",
    storageBucket: "example-login-ca270.appspot.com",
    messagingSenderId: "127736327504",
    appId: "1:127736327504:web:521567a2140b918943d055",
    measurementId: "G-FR356SX9HG"
  };

  constructor(private windowServ: WindowService,
    private router: Router) { }

  ngOnInit(): void {
    firebase.default.initializeApp(this.firebaseConfig);
    console.log(this.windowRef.nativeWindow);
    
    this.windowRef = this.windowServ.windowRef;
    this.windowRef.recaptchaVerifier = 
      new firebase.default.auth.RecaptchaVerifier('recaptcha-container',
      {
        size: "invisible"
      });
    this.windowRef.recaptchaVerifier.render();
  }

  sendOTP(){
    const appVerifier = this.windowRef.recaptchaVerifier;
    const num = '+91' + this.phoneNumber;
    firebase.default.auth().signInWithPhoneNumber(num, appVerifier)
      .then(result => {
        this.windowRef.confirmationResult = result;
      })
      .catch(error => console.log(error));
  }

  verifyOTP(){
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then(result => {
        this.user = result.user;
        this.router.navigate(['/home']);
      })
      .catch(error => {
        this.error = "Incorrect code entered"
        console.log(error,"Incorrect code entered?");
      });      
  }

}
