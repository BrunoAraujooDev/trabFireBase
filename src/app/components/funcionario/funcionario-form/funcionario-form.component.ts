import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../funcionario';

@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.css']
})
export class FuncionarioFormComponent implements OnInit {


  funcionario: FormGroup = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    cargo: ['', [Validators.required]],
    salario: [''],
    foto: [''],
  })

  constructor(
    private fb: FormBuilder,
    private service: FuncionarioService
  ) { }

  ngOnInit(): void {
  }

  addFuncionario(){
    const fun: Funcionario = {
      ...this.funcionario.value
    }
    
    this.service.addFuncionario(fun).then(() => {
      console.log("Funcionou!")
      this.funcionario.reset()
    }, error => {
      console.log(error);
    });
    
  }

}
