import { Component, OnInit } from '@angular/core';
import { CargoService } from '../../services/cargo.service';
import { Cargo } from '../cargo';

@Component({
  selector: 'app-listar-cargos',
  templateUrl: './listar-cargos.component.html',
  styleUrls: ['./listar-cargos.component.css']
})
export class ListarCargosComponent implements OnInit {

  cargo: Cargo[] = []
  columns: string[] = ['cargo', 'descricao', 'salarioBase', 'acoes']
  carregando = false

  constructor(private cargoService: CargoService) { }

  ngOnInit(): void {
    this.listarCargos()
  }

  listarCargos() {
    this.cargoService.listarCargos().subscribe(doc => {
      this.cargo = []
      doc.forEach((element: any) => {
        this.cargo.push({
          id: element.payload.doc.id, 
          ...element.payload.doc.data()
        })
      })
    })
  }
}

