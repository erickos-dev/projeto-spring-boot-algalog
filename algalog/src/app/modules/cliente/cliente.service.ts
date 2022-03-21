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


  postSalvarCliente(cliente: Cliente) {

    return new Promise<any>((resolve, reject) => {
      this._apiGateway.post("clientes", cliente)
        .subscribe({
          next: (res: HttpResponse<Cliente>) => { res.body ? resolve(res.body) : reject(res) },
          error: (err: any) => { reject(err) },
        })
    })
  }

  getClientes(){

    return new Promise<any>((resolve, reject) => {
      this._apiGateway.get("clientes")
        .subscribe({
          next: (res: HttpResponse<Cliente[]>) => { res.body ? resolve(res.body) : resolve(res) },
          error: (err: any) => { reject(err) },
        })
    })

  }

  deleteCliente(clienteId){

    return new Promise<any>((resolve, reject) => {
      this._apiGateway.delete(`clientes/${clienteId}`)
        .subscribe({
          next: (res: HttpResponse<any>) => { res.body ? resolve(res.body) : resolve(res) },
          error: (err: any) => { reject(err) },
        })
    })

  }
}
