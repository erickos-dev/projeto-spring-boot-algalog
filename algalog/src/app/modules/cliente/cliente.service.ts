import { Cliente } from './../../models/cliente';
import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { ApiGateway } from 'api/api-gateway';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private _apiGateway: ApiGateway,
    private http: HttpClient,) { }


  postSalvarCliente(cliente: Cliente): Promise<Cliente> {

    return new Promise<any>((resolve, reject) => {
      this._apiGateway.post("clientes", cliente)
        .subscribe({
          next: (res: HttpResponse<Cliente>) => { res.body ? resolve(res.body) : reject(res) },
          error: (err: any) => { reject(err) },
        })
    })
  }

  getClientes(): Promise<Cliente[]> {

    return new Promise<Cliente[]>((resolve, reject) => {
      this._apiGateway.get("clientes")
        .subscribe({
          next: (res: HttpResponse<Cliente[]>) => { res.body ? resolve(res.body) : reject(res) },
          error: (err: any) => { reject(err) },
        })
    })

  }
}
