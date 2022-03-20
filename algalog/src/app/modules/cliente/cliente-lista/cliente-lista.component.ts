import { Cliente } from './../../../models/cliente';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.scss']
})
export class ClienteListaComponent implements OnInit {

    dataSource = new MatTableDataSource<Cliente>();
 
  displayedColumns: string[] = ["nome", "email", "telefone"];

  constructor() { }

  ngOnInit() {
const dados : Cliente[] = [
  {
    nome: "Erick",
    email: "erick@gmail.com",
    telefone: "71986519803"
  },
  {
    nome: "Erick",
    email: "erick@gmail.com",
    telefone: "71986519803"
  },
  {
    nome: "Erick",
    email: "erick@gmail.com",
    telefone: "71986519803"
  },
  
]

    this.dataSource.data = dados; 
    console.log("🚀 ~ file: cliente-lista.component.ts ~ line 39 ~ ClienteListaComponent ~ ngOnInit ~ this.dataSource", this.dataSource)
  }

}
