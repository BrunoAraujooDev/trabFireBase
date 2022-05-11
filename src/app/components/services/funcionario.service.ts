import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Funcionario } from '../funcionario/funcionario';
import 'firebase/compat/storage';


firebase.initializeApp(environment.firebase);

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  //O subject permita enviar e receber dados
  private funcionarioEdit = new Subject<any>()

  storageRef = firebase.app().storage().ref()

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

  //nesse método é retornado os dados que estão no subject
  getFuncionarioEdit(): Observable<Funcionario>{
    return this.funcionarioEdit.asObservable();
  }

  editarFuncionario(id: string, fun: Funcionario): Promise<any>{
    return this.fireAngular.collection("funcionario").doc(id).update(fun);
  }

  //a função putString faz a conversão do arquivo  imgBase64 para Blob
  async subirImagem(nome: string, imgBase64: any){

    try {
      let result = await this.storageRef.child("imgFoto/" + nome).putString(imgBase64, "data_url")
      console.log(result);
      return await result.ref.getDownloadURL()
      
    } catch (error) {
        console.log("erro: ",error);
        return null        
    }
  }
}
