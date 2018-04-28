import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlunoComponent } from './aluno/aluno.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfessorComponent } from './professor/professor.component';

const AppRoutes:  Routes =[
    {path:'', component: HomeComponent },
    {path: 'login', component: LoginComponent },
    {path: 'cadastro', component: CadastroUsuarioComponent },
    {path: 'professor', component: ProfessorComponent },
    {path: 'professor/:id', component: ProfessorComponent },
    {path: 'aluno', component: AlunoComponent },
];

@NgModule({
    declarations:[],
    imports:[RouterModule.forRoot(AppRoutes)],
    exports:[RouterModule],
    providers:[]
})

export class AppRoutingModule{}