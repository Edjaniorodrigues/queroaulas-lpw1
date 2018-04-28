import { Component, OnInit, ViewEncapsulation, EventEmitter, ContentChildren, QueryList, AfterContentInit, OnChanges, SimpleChanges, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { FacebookModule, LoginResponse, LoginOptions, UIResponse, UIParams } from 'ngx-facebook';
import { FacebookService, InitParams } from 'ngx-facebook';

import { InputTextModule, MenubarModule, TabViewModule, PasswordModule } from 'primeng/primeng';
import { StepsModule, CheckboxModule, MenuItem, MenuModule,RadioButtonModule, DropdownModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';




import { Usuario } from './../models/usuario';
import { AlunoComponent } from './../aluno/aluno.component';
import { UsuarioPersistenciaService } from "../usuario-persistencia.service";



@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class CadastroUsuarioComponent implements OnInit {
 

activeIndex: number = 0;

items: MenuItem[]; 
select: string = 'aluno';

usuario: any={
  nome: '',
  email: '',
  senha: '',
  perfil: ''
}

constructor(
  private FormBuilder:FormBuilder, 
  private usuarioPersistenciaService:UsuarioPersistenciaService
  ) 
  {    

    /*this.usuarioForm =  FormBuilder.group({
      nome:[null],
      email:[null],
      senha: [null]
  
    })*/
  }

  /*formBuilder(){
    this.aluno= new FormControl();
  }*/
 
  ngOnInit() {
    this.items = [
      {label: 'Cadastro'},
      {label: 'Perfil'},
      {label: 'Confirmação'}
  ];
  
}
  

  salvar(){
    let usuario:Usuario = {
      nome : this.usuario.nome,
      email : this.usuario.email,
      senha : this.usuario.senha,
      //perfil : this.usuario.perfil
    };
    this.usuarioPersistenciaService.salvar(usuario);
    console.log(usuario);
    alert("Cadastro Realizado com Sucesso");
  }

  listar(){

    this.usuarioPersistenciaService.listarTodos();
    
  }
  
  next(){
    if(this.activeIndex == 0 || this.activeIndex<2){
    this.activeIndex++;
  }
  }

  previous(){
    this.activeIndex--;
  }

  ok(){
    this.activeIndex=0;
    
  }

  perfil(){
    console.log(this.usuario);
  return this.usuario.perfil;
  }


}
  

  


