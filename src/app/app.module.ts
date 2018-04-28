import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http'; 
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FireBaseConfig } from '../environments/firebase.config';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from "angularfire2/firestore";
import { FacebookModule } from 'ngx-facebook';
import { AuthService } from 'angular2-google-login';

import { ButtonModule, StepsModule, MenuItem, SliderModule, MenuModule, PasswordModule, DropdownModule } from 'primeng/primeng';
import { InputTextModule, GrowlModule, MenubarModule, SharedModule, DataTableModule } from 'primeng/primeng';
import { RadioButtonModule, ContextMenuModule, TabViewModule } from 'primeng/primeng';
import {CheckboxModule} from 'primeng/primeng';

import { AnuncioPersistenciaService } from './anuncio-persistencia.service';
import { UsuarioPersistenciaService } from "./usuario-persistencia.service";

import { AnuncioRoutingModule } from './anuncio/anuncio.routing.module';
import { AppRoutingModule } from './app.routing.module';
import { ProfessorModule } from './professor/professor.module';
import { LoginModule } from './login/login.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { AlunoComponent } from './aluno/aluno.component';
import { RespostaProfPersistenciaService } from './respostaProf-persistencia.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CadastroUsuarioComponent,
    AlunoComponent,
  ],
  exports:[],
  imports: [
    AngularFireModule.initializeApp(FireBaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AnuncioRoutingModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    ContextMenuModule,
    DataTableModule,
    DropdownModule,
    FacebookModule.forRoot(),
    FormsModule,
    GrowlModule, 
    HttpModule,
    InputTextModule,
    LoginModule, 
    MenubarModule,
    MenuModule,
    ProfessorModule,
    PasswordModule,
    RadioButtonModule,
    ReactiveFormsModule,
    StepsModule,
    SliderModule,
    TabViewModule,
    CheckboxModule
  ],
  providers: [
    AnuncioPersistenciaService,
    RespostaProfPersistenciaService,
    UsuarioPersistenciaService, 
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
