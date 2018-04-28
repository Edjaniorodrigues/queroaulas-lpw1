import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';

import { SliderModule, DropdownModule, SelectItem } from 'primeng/primeng';

import { AnuncioPersistenciaService } from './../anuncio-persistencia.service';

import { LoginModule } from './../login/login.module';

import { Anuncio } from '../models/anuncio';
import { Usuario } from '../models/usuario';
import { Materia } from './../models/materia';



@Component({
  selector: 'app-anuncio',
  templateUrl: './anuncio.component.html',
  styleUrls: ['./anuncio.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AnuncioComponent implements OnInit {

  private formAnuncio: FormGroup;

  val: number;
  materia: Materia[];
  matSelecionada: Materia;
  token: any;
  name: any;
  email: any;
  imageURL: any;

  constructor(
    private formBuilder: FormBuilder,
    private anuncioPersistenciaService: AnuncioPersistenciaService) {

    this.formAnuncio = formBuilder.group({
      assunto: new FormControl(),
      matSelecionada: new FormControl(),
      horario: new FormControl(),
      valor: new FormControl()
    })
    //this.val = this.formAnuncio.value.valor;
    //console.log("pops", this.val);
    
    //Categorias de Matérias
     this.materia = [
      { nomeMateria: 'Português', codigo: 'PORT' },
      { nomeMateria: 'Redes de Computadores', codigo: 'REDCOMP' },
      { nomeMateria: 'Matemática', codigo: 'MATEM' },
      { nomeMateria: 'Inglês', codigo: 'ING' },
      { nomeMateria: 'Programação', codigo: 'PROG' },
      { nomeMateria: 'Música', codigo: 'MUS' },
      { nomeMateria: 'Banco de Dados', codigo: 'BD' },
      { nomeMateria: 'Biologia', codigo: 'BIO' },
      { nomeMateria: 'Arquitetura de Software', codigo: 'AS' }
    ];
    
    //Login
    this.token = localStorage.getItem('token');
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
    this.imageURL = localStorage.getItem('image');
  }

  ngOnInit() {
    // this.valorTeste = this.formAnuncio.value.valor;
  }


  salvarAnuncio() {
    let anuncio: Anuncio = {
      assunto: this.formAnuncio.value.assunto,
      matSelecionada: this.formAnuncio.value.matSelecionada,
      horario: this.formAnuncio.value.horario,
      valor: this.formAnuncio.value.valor,
      user: localStorage.getItem('name'),
      email: localStorage.getItem('email'),
    }
    this.anuncioPersistenciaService.salvar(anuncio);
    console.log(anuncio);
  }

  // Pega o evento do click e atribui a variavel
  handleChange(e) {
    this.val = e.value;
    //console.log("valor do evento slider",e.value);
  }
  // this.anuncioPersistencia.salvarAnuncio(anuncio);
}
