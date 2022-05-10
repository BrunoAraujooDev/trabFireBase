import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Funcionario } from '../funcionario/funcionario';

firebase.initializeApp(environment.firebase);

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  //O subject permita enviar e receber dados
  private funcionarioEdit = new Subject<any>()

  constructor(
    private fireAngular: AngularFirestore
  ) { }

  listarFuncionarios(): Observable<any> {
    return this.fireAngular.collection('funcionario').snapshotChanges();
  }

  addFuncionario(fun: Funcionario): Promise<any>{
    return this.fireAngular.collection('funcionario').add(fun);
  }

  excluirFuncionario(id: string): Promise<any>{
    return this.fireAngular.collection("funcionario").doc(id).delete();
  }

  // o next coloca os dados do funcionario escolhido dentro do subject
  pegarDados(funcionario: Funcionario){
    this.funcionarioEdit.next(funcionario);

  }

  deleteFuncionario(){

  }
}
