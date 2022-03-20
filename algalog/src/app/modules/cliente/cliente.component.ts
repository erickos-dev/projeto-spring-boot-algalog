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

  loading: boolean = false;

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
    this.loading = true;
    if (!this.formCliente.valid) {
      this.loading = false;
      return;
    }
    const cliente = this.formCliente.getRawValue();
    this._clienteService.postSalvarCliente(cliente).then(response => {
      this.loading = false;
    })
      .catch(err => {
        this.loading = false;
      });
  }


}
