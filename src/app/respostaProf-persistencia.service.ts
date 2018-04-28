import { Injectable } from "@angular/core";

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { RespostaProf } from './models/respostaProf';

@Injectable()
export class RespostaProfPersistenciaService {

    respostaProfCollection: AngularFirestoreCollection<RespostaProf>;


    constructor(private afs: AngularFirestore) {
        this.respostaProfCollection = this.afs.collection<RespostaProf>('RespostaProfessor');
    }

    salvarRespostaProf(respProf: RespostaProf) {
        this.respostaProfCollection.add(respProf).then(r => {
            respProf.id = r.id;
            console.log("Resposta do Professor Add com ID:", respProf);
        });
    }

    deletar() { }

    editar() { }

    listarPorId(RespostaProfId){
        return new Observable(observer => {
            let doc = this.respostaProfCollection.doc(RespostaProfId);
            doc.snapshotChanges().subscribe(result => {
              let id = result.payload.id;
              let data = result.payload.data()
              let document = { id: id, ...data };
              observer.next(document);
              observer.complete();
            });
          });
        }
    

    listarTdsProfs():Observable<any[]> {
        let resultados: any[] = [];
        let meuObservable = new Observable<any[]>(observer => {
          this.respostaProfCollection.snapshotChanges().subscribe(result => {
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
    }

