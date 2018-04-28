import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { Injectable } from '@angular/core';

import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { PasswordModule } from 'primeng/primeng';
import * as firebase from 'firebase';
import { FacebookService, LoginResponse, UIParams, UIResponse } from 'ngx-facebook';
import { AuthService, AppGlobals } from 'angular2-google-login';
import { LoginService} from './login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  imageURL: string;
  email: string;
  name: string;
  token: string;
  model: any={};
  loading =false;
  error = '';


  constructor(
    private auth: AuthService,
    private afAuth: AngularFireAuth,
    private fb: FacebookService,
    private zone: NgZone,
    private router: Router,
    private loginService: LoginService) { 

      fb.init({
        appId: '1927971220769787',//falta mudar esse usuário está Ngx
        version: 'v2.9'
      });
    }


  ngOnInit() {
     //Set your Google Client ID here
     AppGlobals.GOOGLE_CLIENT_ID = '177867715856-n7q0niserd7l2h4md7d1s0ddqr89qp00.apps.googleusercontent.com';
     this.getData();
     setTimeout(() => { this.googleAuthenticate() }, 50);
  }


  login(f: NgForm){
    this.loading = true;
    this.loginService.login(f.controls.email.value, f.controls.senha.value)
    .subscribe(result => {
      if (result == true){
        this.router.navigate(['/']);
      } else{
        this.error = 'Email ou Senha Incorreta';
        this.loading = false;
      }
    });
  
  }
  // Login Local

  form_login(f: NgForm){
    if(!f.valid)
    return;
    this.afAuth.auth.signInWithEmailAndPassword(f.controls.email.value, f.controls.senha.value)
    .then(ok => {
      this.router.navigate(["/professor"]);
    });

    //f.controls.email.setValue('');
    //f.controls.senha.setValue('');
  }

  // Login com Facebook
  loginFb() {
    this.fb.login()
      .then((res: LoginResponse) => {
        console.log('Logged in', res);
      })
      .catch(this.handleError);
  }

  private handleError(error) {
    console.error('Error processing action', error);
  }

   // Login com GoogleAuth
    googleAuthenticate() {
      this.auth.authenticateUser((result) => {
        //Using Angular2 Zone dependency to manage the scope of variables
        this.zone.run(() => {
          this.getData();
        });
      });
    }
  
    // Getting data from browser's local storage
    getData() {
      this.token = localStorage.getItem('token');
      this.imageURL = localStorage.getItem('image');
      this.name = localStorage.getItem('name');
      this.email = localStorage.getItem('email');
     console.log(this.token, this.name, this.email);
    }
    
    // Logout user and calls function to clear the localstorage
    logout() {
      let scopeReference = this;
      this.auth.userLogout(function () {
        scopeReference.clearLocalStorage();
      });
    }
  
    // Clearing Localstorage of browser
    clearLocalStorage() {
      localStorage.removeItem('token');
      localStorage.removeItem('image');
      localStorage.removeItem('name');
      localStorage.removeItem('email');
    }
  }

