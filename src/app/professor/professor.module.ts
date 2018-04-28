import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from "angularfire2/firestore";
import { FireBaseConfig } from '../../environments/firebase.config';
import { FacebookModule } from 'ngx-facebook';

import { InputTextModule, ButtonModule, DataTableModule, SharedModule, DialogModule } from 'primeng/primeng';

import { AnuncioModule } from './../anuncio/anuncio.module';
import { ProfessorComponent } from './professor.component';

@NgModule({
  imports: [
    AnuncioModule,
    CommonModule,
    FormsModule,
    ButtonModule, 
    InputTextModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    DataTableModule, 
    SharedModule,
    ReactiveFormsModule,
    FacebookModule.forRoot(),
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(FireBaseConfig),
    AngularFirestoreModule.enablePersistence(),
    DialogModule
  ],
  providers: [
    AngularFireDatabase
  ],
  exports: [
    ProfessorComponent
  ],
  declarations: [
    ProfessorComponent 
  ]
})
export class ProfessorModule { } 
