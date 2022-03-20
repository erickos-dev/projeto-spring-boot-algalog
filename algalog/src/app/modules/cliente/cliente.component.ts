import { ClienteService } from './cliente.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {


  formCliente: FormGroup;

  constructor(private _formBuilder: FormBuilder,
    private _clienteService: ClienteService
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formCliente = this._formBuilder.group({
      nome: ["", Validators.required],
      telefone: ["", Validators.required],
      email: ["", Validators.required]
    })
  }

  submitForm() {
    if (!this.formCliente.valid) {
      return;
    }
    const cliente = this.formCliente.getRawValue();
    this._clienteService.postSalvarCliente(cliente).then(response => {
    console.log("🚀 ~ file: cliente.component.ts ~ line 38 ~ ClienteComponent ~ this._clienteService.postSalvarCliente ~ response", response)
    })
    .catch(err => {
    console.log("🚀 ~ file: cliente.component.ts ~ line 41 ~ ClienteComponent ~ submitForm ~ err", err)
      
    });
  }


}
