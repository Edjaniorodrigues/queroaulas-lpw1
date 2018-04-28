import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { InputTextModule, MenubarModule, ButtonModule, DataTableModule, SharedModule } from 'primeng/primeng';

import { AuthService, AppGlobals } from 'angular2-google-login';
import { FacebookService } from 'ngx-facebook';

import { AnuncioPersistenciaService } from '../../anuncio-persistencia.service';
import { RespostaProfPersistenciaService } from './../../respostaProf-persistencia.service';



@Component({
  selector: 'app-detalhes-anuncio',
  templateUrl: './detalhes-anuncio.component.html',
  styleUrls: ['./detalhes-anuncio.component.css']
})
export class DetalhesAnuncioComponent implements OnInit {

  //só pra compor o perfil do aluno depois eu tiro
  varPerfil: string = "Aluno";

  id: string;
  respAnuncioProf;
  documentAnuncio;
  //Login
  token: string;
  name: string;
  email: string;
  imageURL: string;

  //
  teste = null;

  constructor(
    private fb: FacebookService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private anuncioPersistenciaService: AnuncioPersistenciaService,
    private respostaProfPersistenciaService: RespostaProfPersistenciaService
  ) {
    //Recupera o id pela passada pela URL
    this.id = this.route.snapshot.params['id'];
    console.log("Exibindo id", this.id);
    //Retorna um anúncio passado ao método
    this.anuncioPersistenciaService.listarPorId(this.id).subscribe(result => {
      this.documentAnuncio = result;
      console.log("DocumentAnuncio", this.documentAnuncio)
      return this.documentAnuncio;
    })
   
  //Recupera informações do Login
    this.token = localStorage.getItem('token');
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
    this.imageURL = localStorage.getItem('image');
  }

  ngOnInit() {
    this.respAnuncioLista();
  }

  //Retorna todas os anuncios respondidos pelos professores
  respAnuncioLista() {
    this.respostaProfPersistenciaService.listarTdsProfs().subscribe(result => {
      this.respAnuncioProf = result;
      console.log("anuncio em detalhe lista", this.respAnuncioProf);
      //return this.respAnuncioProf;
    });
  }

  //Sair do sistema
  logout() {
    let scopeReference = this;
    this.auth.userLogout(function () {
      scopeReference.clearLocalStorage();
    });
  }

  //Clearing Localstorage of browser
  clearLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('image');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
  }

}
