import { ClienteListaComponent } from './cliente-lista/cliente-lista.component';
import { ClienteService } from './cliente.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'app/models/cliente';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  @ViewChild('clientes') clientes: ClienteListaComponent;

  formCliente: FormGroup;

  loading: boolean = false;

  step = 0;

  constructor(private _formBuilder: FormBuilder,
    private _clienteService: ClienteService
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm(cliente?: Cliente) {
    this.formCliente = this._formBuilder.group({
      id: [cliente ? cliente.id : ""],
      nome: [cliente ? cliente.nome : "", Validators.required],
      telefone: [cliente ? cliente.telefone : "", Validators.required],
      email: [cliente ? cliente.email : "", Validators.required]
    })
  }

  submitForm() {
    this.loading = true;
    if (!this.formCliente.valid) {
      this.loading = false;
      return;
    }
    const cliente = this.formCliente.getRawValue();
    this._clienteService.postSalvarCliente(cliente).then(response => {
      this.loading = false;
      this.createForm(response);
      this.clientes.reload();
    })
      .catch(err => {
        this.loading = false;
      });
  }

  editarCliente(cliente) {
    this.createForm(cliente);
    this.setStep(0);
  }

  apagarCliente() {
    this._clienteService.deleteCliente(this.formCliente.controls['id'].value)
      .then(() => {
        this.formCliente.reset();
      }).catch((err) => console.log(err))
  }

  setStep(index) {
    this.step = index;
  }



}
