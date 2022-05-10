import { Component, OnInit } from '@angular/core';
import { elementAt } from 'rxjs';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../funcionario';

@Component({
  selector: 'app-funcionario-lista',
  templateUrl: './funcionario-lista.component.html',
  styleUrls: ['./funcionario-lista.component.css']
})
export class FuncionarioListaComponent implements OnInit {

  funcionarios: Funcionario[] = []
  carregando: Boolean = false

  columns: string[] = ["nome", "email", "cargo", "salario", "ações"]

  constructor(
    private funcService: FuncionarioService
  ) { }

  ngOnInit(): void {

    this.listarFuncionarios()
  }

  listarFuncionarios(){
    this.funcService.listarFuncionarios().subscribe(doc => {
      this.funcionarios = []
      doc.forEach( (item : any) => this.funcionarios.push({
        id: item.payload.doc.id,
        ...item.payload.doc.data()
      }))
    })
    console.log(this.funcionarios);
    
  }

  excluirFuncionario(id: string){
    this.funcService.excluirFuncionario(id).then(()=> {
      console.log("funcionário excluido")
    }, error => {
      console.log("Erro ao excluir o funcionário: ",error);
      
    })
  }

  editarFuncionario(fun: Funcionario){
    
  }

}
