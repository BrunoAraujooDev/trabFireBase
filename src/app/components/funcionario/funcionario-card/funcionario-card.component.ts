import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../funcionario';

@Component({
  selector: 'app-funcionario-card',
  templateUrl: './funcionario-card.component.html',
  styleUrls: ['./funcionario-card.component.css']
})
export class FuncionarioCardComponent implements OnInit {

  funcionarios: Funcionario[] = []

  constructor(
    private service: FuncionarioService
  ) { }

  
ngOnInit(): void {
  this.mostrarFuncionarios()
}

mostrarFuncionarios(){

  this.service.listarFuncionarios().subscribe(doc =>{
   console.log(doc)
   this.funcionarios = []
   doc.forEach((element:any) => {
     this.funcionarios.push({
       id: element.payload.doc.id,
       ...element.payload.doc.data()})
     });
  })
  console.log(this.funcionarios)
}
}
