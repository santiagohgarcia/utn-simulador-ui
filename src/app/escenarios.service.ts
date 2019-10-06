import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class EscenariosService {

  constructor(private http: HttpClient, private messageService: MessagesService) { }

  getEscenarios(): Observable<any> {
    return this.http.get(`${environment.proyectoServiceHost}/api/escenarios`)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

  getEscenario(id): Observable<any> {
    return this.http.get(`${environment.proyectoServiceHost}/api/escenarios/${id}`)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

  modifyEscenario(escenario) {
    return this.http.put(`${environment.proyectoServiceHost}/api/escenarios/${escenario.id}`, escenario)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

  createEscenario(escenario) {
    delete escenario.id;
    return this.http.post(`${environment.proyectoServiceHost}/api/escenarios`, escenario)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

  deleteEscenario(id): Observable<any> {
    return this.http.delete(`${environment.proyectoServiceHost}/api/escenarios/${id}`)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

  getDecisiones(idEscenario): Observable<any> {
    return this.http.get(`${environment.proyectoServiceHost}/api/escenario/${idEscenario}/decisiones`)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

  getProveedores(idEscenario): Observable<any> {
    return this.http.get(`${environment.proyectoServiceHost}/api/escenario/${idEscenario}/proveedores`)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

  getDecision(idEscenario, idDecision) {
    return this.http.get(`${environment.proyectoServiceHost}/api/escenario/${idEscenario}/decisiones`)
      .pipe(map((decisiones: Array<any>) => {
        return decisiones.find(d => d.id === idDecision);
      }));
  }

  getProveedor(idEscenario, idProveedor) {
    return this.http.get(`${environment.proyectoServiceHost}/api/escenario/${idEscenario}/proveedores`)
      .pipe(map((proveedores: Array<any>) => {
        return proveedores.find(p => p.id === idProveedor);
      }));
  }

  getFinanciaciones(idEscenario): Observable<any> {
    return this.http.get(`${environment.proyectoServiceHost}/api/escenario/${idEscenario}/financiacion`)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

}
