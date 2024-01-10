import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  constructor(private httpClient:HttpClient) { }


  public registrarUsuario(datosprov: any){
    return this.httpClient.post(`${baserUrl}/api/proveedores/save/`, datosprov);
  }

  public listarProveedores(){
    return this.httpClient.get(`${baserUrl}/api/proveedores/getAll/`);
  }

  public eliminarProveedor(nombre:any){
    return this.httpClient.delete(`${baserUrl}/api/proveedores/eliminarProveedor/${nombre}`);
  }

}
