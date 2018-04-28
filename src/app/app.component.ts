import { Component, OnInit, NgZone } from '@angular/core';

import { AuthService, AppGlobals } from 'angular2-google-login';
import { FacebookService } from 'ngx-facebook';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{

  token: string;
  name: string;
  email: string;
  imageURL: string;

  title = 'app';

  constructor (
    private fb: FacebookService,
    private auth: AuthService,
    private zone: NgZone){
    
    this.token = localStorage.getItem('token');
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
    this.imageURL = localStorage.getItem('image');
   
    
    /*
     *console.log(localStorage.getItem('name'));
     */
    //console.log("ops",token);
  }


  logout() {
    let scopeReference = this;
    this.auth.userLogout(function () {
      scopeReference.clearLocalStorage();
    });
  }

  /**
   * Clearing Localstorage of browser
   */
  clearLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('image');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
  }
  ngOnInit() {
  }
}
