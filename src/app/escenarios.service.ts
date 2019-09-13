import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';
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
}
