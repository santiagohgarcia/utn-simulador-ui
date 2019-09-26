import { Injectable } from '@angular/core';
import { EscenariosService } from './escenarios.service';
import { map, switchMap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  constructor(private http: HttpClient, private messageService: MessagesService, private escenarioService: EscenariosService) { }

  _getProveedores(idEscenario) {
    return this.escenarioService.getProveedores(idEscenario);
  }

  _saveProveedores(idEscenario, proveedores) {
    return this.http.post(`${environment.proyectoServiceHost}/api/escenario/${idEscenario}/proveedores`, proveedores)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

  removeProveedor(proveedor) {
    return this._getProveedores(proveedor.escenarioId).pipe(
      switchMap(proveedores => {
        let nuevosProveedores = proveedores.filter(p => p.id !== proveedor.id)
        return this._saveProveedores(proveedor.escenarioId, nuevosProveedores);
      })
    );
  }

  createProveedor(proveedor) {
    return this._getProveedores(proveedor.escenarioId).pipe(
      switchMap(proveedores => {
        proveedores.push(proveedor)
        return this._saveProveedores(proveedor.escenarioId, proveedores);
      })
    );
  }

  modifyProveedor(proveedor) {
    return this._getProveedores(proveedor.escenarioId).pipe(
      switchMap(proveedores => {
        var oldProveedor = proveedores.find( p => p.id === proveedor.id)
        proveedores.splice(proveedores.indexOf(oldProveedor),1,proveedor)
        return this._saveProveedores(proveedor.escenarioId, proveedores);
      })
    );
  }


}
