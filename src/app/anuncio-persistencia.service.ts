import { Injectable } from '@angular/core';

import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";

import { Anuncio } from "./models/anuncio";
import { Usuario } from './models/usuario';

//import { RespostaProf } from './models/respostaProf'
import { FirebaseApp } from 'angularfire2/firebase.app.module';
import { firestore } from 'firebase';
import * as firebase from 'firebase/app';

@Injectable()
export class AnuncioPersistenciaService {

  private anuncioCollection: AngularFirestoreCollection<Anuncio>;
 

  constructor(private afs: AngularFirestore) {
    this.anuncioCollection = this.afs.collection<Anuncio>('anuncio');
  }

  salvar(anuncio: Anuncio) {
    this.anuncioCollection.add(anuncio).then(resultado => {
      anuncio.id = resultado.id;
      console.log(anuncio.id);
    });
  }

  listarTodos(): Observable<any[]> {
    let resultados: any[] = [];
    let meuObservable = new Observable<any[]>(observer => {
      this.anuncioCollection.snapshotChanges().subscribe(result => {
        result.map(documents => {
          let id = documents.payload.doc.id;
          let data = documents.payload.doc.data();
          let document = { id: id, ...data };
          resultados.push(document);
        });
        observer.next(resultados);
        observer.complete();
      });
    });
    return meuObservable;
  }

  deletar(anuncio): Promise<void> {
    return this.anuncioCollection.doc(anuncio.id).delete();
  }

  listarPorId(anuncioId) {
    return new Observable(observer => {
      let doc = this.anuncioCollection.doc(anuncioId);
      doc.snapshotChanges().subscribe(result => {
        let id = result.payload.id;
        let data = result.payload.data()
        let document = { id: id, ...data };
        observer.next(document);
        observer.complete();
      });
    });
  }
}