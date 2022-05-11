import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cargo } from '../../cargos/cargo';
import { CargoService } from '../../services/cargo.service';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../funcionario';

@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.css']
})
export class FuncionarioFormComponent implements OnInit {

  descricoes: any = {
    ADM: "Administração",
    RH: "Recursos Humanos",
    TI: "Tecnologia da Informação"
  }

  cargos: Cargo[] = []

  funcionario: FormGroup = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    cargo: ['', [Validators.required]],
    salario: [''],
    foto: [''],
  })

  id: string | undefined
  urlImagem: any = ""


  constructor(
    private fb: FormBuilder,
    private service: FuncionarioService,
    private cargoService: CargoService
  ) { }

  ngOnInit(): void {
    this.service.getFuncionarioEdit().subscribe(result => {
      
      const {id, foto, ...item} = result
      this.urlImagem = foto
      this.id = id
      
      this.funcionario.patchValue( item ) 
    })

    this.buscarCargos()
  }

  

  salvarFuncionario(){

    if(this.id == undefined){
      this.addFuncionario()
    } else {
      this.editarFuncionario(this.id)
    }
  }

  addFuncionario() {

    const {foto, ...func} = this.funcionario.value

    const fun: Funcionario = {
      ...func,
      foto: this.urlImagem
    }
    
    

    this.service.addFuncionario(fun).then(() => {
      console.log("Funcionário cadastrado com salvo!")
      this.funcionario.reset()
    }, error => {
      console.log(error);
    });
  }

  editarFuncionario(id: string){

    const {foto, ...func} = this.funcionario.value

    const funcionario: Funcionario = {
      ...func,
      foto: this.urlImagem
    }

    this.service.editarFuncionario(id, funcionario).then(() => {
      console.log("Funcionário editado com sucesso!");
      
      this.funcionario.reset();
      this.id = undefined
    }, error => {
      
      console.log("Deu erro ao editar o funcionário.Erro: ", error);
      
    })
  }

  carregarImagem(event: any){

    let arquivo = event.target.files[0]
    let reader = new FileReader()

    reader.readAsDataURL(arquivo)
    reader.onloadend = () => {
      console.log(reader.result);
      this.service.subirImagem("funcionario" + this.funcionario.value['nome'] + Date.now(), reader.result).then((url => {
        this.urlImagem = url
      }))
      
    }
  }

  buscarCargos(){
    this.cargoService.listarCargos().subscribe(doc => {
      this.cargos = []
      doc.forEach((element: any) => {
        this.cargos.push({
          id: element.payload.doc.id, 
          ...element.payload.doc.data()
        })
      })
    })
  }

}
