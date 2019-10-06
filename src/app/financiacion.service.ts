import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';
import { MessagesService } from './messages.service';
@Injectable({
  providedIn: 'root'
})
export class FinanciacionService {

  constructor(private http: HttpClient, private messageService: MessagesService) { }

  removeFinanciacion(financiacion) {
    return this.http.delete(`${environment.proyectoServiceHost}/api/financiacion/${financiacion.id}`)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

  createFinanciacion(financiacion) {
    return this.http.post(`${environment.proyectoServiceHost}/api/financiacion`, financiacion)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

  modifyFinanciacion(financiacion) {
    return this.http.put(`${environment.proyectoServiceHost}/api/financiacion/${financiacion.id}`, financiacion)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

}
