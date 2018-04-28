import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';


import { ButtonModule, InputTextModule, DialogModule } from 'primeng/primeng';

import { FacebookService, LoginResponse } from 'ngx-facebook';
import { AuthService, AppGlobals } from 'angular2-google-login';

import { LoginModule } from './../login/login.module';
import { Anuncio } from './../models/anuncio';

import { AnuncioPersistenciaService } from './../anuncio-persistencia.service';
import { UsuarioPersistenciaService } from './../usuario-persistencia.service';
import { RespostaProfPersistenciaService } from '../respostaProf-persistencia.service';

import { RespostaProf } from './../models/respostaProf';


@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfessorComponent implements OnInit {

  //coloquei só pra compor perfil depois retiro
  varPerfil: string = "Professor";

  private formRespProf: FormGroup;

  nomeSelected: string;
  idSelected: string;
  relacaoT;
  relacaoAnuncios;
  anuncioSelecionado;
  display: boolean = false;

  // Login
  token: string;
  imageURL: string;
  name: string;
  email: string;
  
  respostaProfessorCollection: AngularFirestoreCollection<RespostaProf>;

constructor(
    private auth: AuthService,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private anuncioPersistenciaService: AnuncioPersistenciaService,
    private fb: FacebookService,
    private formBuilder: FormBuilder,
    private respostaProfPersistenciaService: RespostaProfPersistenciaService,
    private router: Router,
    private route: ActivatedRoute,
    private db: AngularFireDatabase) {

    /*   db.list('anuncio').valueChanges().subscribe(result => {
         this.usuarios = result;
     }).catch(error => console.error(error));*/

this.respostaProfessorCollection = this.afs.collection<RespostaProf>('RespostaProfessor');

    //Capturando a sessão
    this.token = localStorage.getItem('token');
    this.imageURL = localStorage.getItem('image');
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');

    //Pegar o valor do campo Resposta professor - valorResp
    this.formRespProf = formBuilder.group({
      valorResp: new FormControl()
    })
  }

  //Login Local
  form_login(f: NgForm) {
    if (!f.valid)
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

  form_logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }


  ngOnInit() {
    this.listarTodos();
    this.listarTdsProfs();
  }

  // Retorna lista de todos anuncios
  listarTodos() {
    this.anuncioPersistenciaService.listarTodos().subscribe(relacaoAnuncios => {
      this.relacaoAnuncios = relacaoAnuncios;
    });
    console.log("rel Anuncio", this.relacaoAnuncios);
    return this.relacaoAnuncios;
  }
 

// Retorna todos as Respostas dos Professores que aceitaram os Anúncios feitos
listarTdsProfs(){
  this.respostaProfPersistenciaService.listarTdsProfs().subscribe(relacaoT => {
  this.relacaoT = relacaoT;
  console.log("rel Anuncio", this.relacaoT);
})
} 

// Salvando Resposta do professor
  salvarRespProf(id) {
    console.log("exibe o id", id);
    let respostaProf: RespostaProf = {
      idAnuncio: id,
      respProf: [{
          valorResp: this.formRespProf.value.valorResp,
          nomeProf: localStorage.getItem('name')
      }
    ]
    }
    console.log("valor da resposta", respostaProf);
    if (id != null) {
      this.respostaProfPersistenciaService.salvarRespostaProf(respostaProf);   
    } else {
      //console.log("sem sucesso! - professor.component.ts - editar Anuncio");
    }
  }
  

  // Retorna o Usuário que lançou o anúncio 
  showDialog(id) {
    //console.log("imprimindo id: ", id);
    this.display = true;
    for (let i = 0; i < this.relacaoAnuncios.length; i++) {
      if (this.relacaoAnuncios[i].id == id) {
        this.nomeSelected = this.relacaoAnuncios[i].user;
        this.idSelected = this.relacaoAnuncios[i].id;
        console.log("var nome escolhido", this.nomeSelected);
        return this.nomeSelected, this.idSelected;
      } else {
        //console.log("nada");
      }
    }
  }
}
