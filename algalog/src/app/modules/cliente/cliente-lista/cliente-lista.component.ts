import { ClienteService } from './../cliente.service';
import { Cliente } from './../../../models/cliente';
import { Component, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ClienteListaComponent implements OnInit {
  @Output('clienteEditar') clienteEditar: EventEmitter<any> = new EventEmitter();

  dataSource = new MatTableDataSource<Cliente>();

  displayedColumns = [{ nome: 'nome', campo: 'Nome' }, { nome: 'email', campo: 'Email'}, { nome: 'telefone', campo: 'Telefone' }, {nome:'butons', campo: 'Buttons'} ];
  display = new Array<any>();

  expandedElement: any;
  constructor(private _clienteService: ClienteService) { }

  ngOnInit() {
    this.getClientes();

    this.displayedColumns.forEach(teste => { 
      this.display.push(teste.campo)
    })

  }

  reload() {
    this.getClientes();
  }

  getClientes() {
    this._clienteService.getClientes()
      .then(response => {
        this.dataSource.data = response;
      })
  }

  editar(cliente){
    this.clienteEditar.emit(cliente)

  }

  

}
