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

  removeProveedor(proveedor) {
    return this.http.delete(`${environment.proyectoServiceHost}/api/proveedores/${proveedor.id}`)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

  createProveedor(proveedor) {
    return this.http.post(`${environment.proyectoServiceHost}/api/proveedor`, proveedor)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

  modifyProveedor(proveedor) {
    return this.http.put(`${environment.proyectoServiceHost}/api/proveedores/${proveedor.id}`, proveedor)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }


}
