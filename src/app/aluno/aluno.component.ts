import { Component, OnInit } from '@angular/core';

import { DataTableModule,SharedModule, InputTextModule } from 'primeng/primeng';
import { AuthService, AppGlobals } from 'angular2-google-login';

import { AnuncioPersistenciaService } from './../anuncio-persistencia.service';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css']
})

export class AlunoComponent implements OnInit {
 
  relacaoAnuncios;

  items: any[] = [];
  token: string;
  imageURL: string;
  name: string;
  email: string;

  //Só pra compor o perfil do cara criei essa var mas depois tiro
  varPerfil:string = "Aluno";

  constructor(private anuncioPersistenciaService:AnuncioPersistenciaService) { 

    this.token = localStorage.getItem('token');
    this.imageURL = localStorage.getItem('image');
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
    //console.log("Valor da variável nome: ",this.name);  
    }
 
  ngOnInit() {
    this.listarTodos();
  }
  
  listarTodos() {
    this.anuncioPersistenciaService.listarTodos().subscribe(relacaoAnuncios => {
      this.relacaoAnuncios = relacaoAnuncios;
    });
    console.log("Retorno da Lista de Anuncios: ", this.relacaoAnuncios);
  };
 
}
