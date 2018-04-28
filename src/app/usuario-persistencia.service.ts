import { Injectable } from '@angular/core';

import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestore } from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";

import { Usuario } from "./models/usuario";

@Injectable()
export class UsuarioPersistenciaService {


  private usuarioCollection: AngularFirestoreCollection<Usuario>;
  constructor(private afs: AngularFirestore) {
    this.usuarioCollection = this.afs.collection<Usuario>("usuario");
  }

  salvar(usuario: Usuario) {
    this.usuarioCollection.add(usuario).then(resultado => {
      usuario.id = resultado.id;
      console.log(usuario.id);
    });
  }

  listarTodos(): Observable<any[]> {
    let resultados: any[] = [];
    let meuObservable = new Observable<any[]>(observer => {
      this.usuarioCollection.snapshotChanges().subscribe(result => {
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

  deletar(usuario): Promise<void> {
    return this.usuarioCollection.doc(usuario.id).delete();
  }

  listarPorId(usuarioId) {
    return new Observable(observer => {
      let doc = this.usuarioCollection.doc(usuarioId);
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