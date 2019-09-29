import { Injectable, Component } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MessagesService } from './messages.service';

@Injectable()
export class UsuarioService {

  constructor(private http: HttpClient,
    private messageService: MessagesService) { }

  getUsuario(email): Observable<any> {
    return this.http.get(`${environment.proyectoServiceHost}/api/usuario/${email}`)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

  getProyectoUsuario(idEscenario, idUsuario): Observable<any> {
    return this.http.get(`${environment.proyectoServiceHost}/api/escenario/${idEscenario}/usuario/${idUsuario}/proyecto`)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

}

