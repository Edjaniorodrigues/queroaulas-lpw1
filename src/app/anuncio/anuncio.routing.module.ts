import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalhesAnuncioComponent } from './detalhes-anuncio/detalhes-anuncio.component';
import { AnuncioComponent } from './anuncio.component';

const AppAnuncioRoutes: Routes = [
    { path: 'anuncio', component: AnuncioComponent },
    { path: 'anunciod', component: DetalhesAnuncioComponent },
    { path: 'anunciod/:id', component: DetalhesAnuncioComponent }, 
    //{ path: '', component:}
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(AppAnuncioRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: []
})

export class AnuncioRoutingModule { }