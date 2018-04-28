import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthService } from 'angular2-google-login';
import { FacebookModule } from 'ngx-facebook';

import { SliderModule, ButtonModule, InputTextModule, SharedModule } from 'primeng/primeng';

import { LoginComponent } from './login.component';
import { HttpModule } from '@angular/http';
import { LoginService } from './login.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    InputTextModule,
    RouterModule,
    ReactiveFormsModule, 
    SliderModule,  
     
  ],
  declarations: [
    LoginComponent
  ],
  exports:[
    LoginComponent
  ],
  providers:[LoginService ]
})
export class LoginModule { }