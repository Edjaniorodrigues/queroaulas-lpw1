import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SliderModule, ButtonModule, InputTextModule, DropdownModule, DataTableModule } from 'primeng/primeng';

import { LoginModule } from '../login/login.module';

//import { AnuncioPersistenciaService } from './../anuncio-persistencia.service';
//import { AngularFireDatabase } from 'angularfire2/database';
import { AnuncioComponent } from './anuncio.component';
import { DetalhesAnuncioComponent } from './detalhes-anuncio/detalhes-anuncio.component';

@NgModule({
  imports: [
    LoginModule,
    CommonModule,
    DataTableModule,
    DropdownModule,
    ReactiveFormsModule,
    SliderModule,
    ButtonModule,
    InputTextModule
  ],
  declarations: [
    AnuncioComponent,
    DetalhesAnuncioComponent
  ],
  exports:[
    AnuncioComponent,
  ],
  providers:[]
})
export class AnuncioModule { }
