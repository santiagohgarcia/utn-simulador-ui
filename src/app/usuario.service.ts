import { Injectable, Component } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { MessagesService } from './messages.service';

@Injectable()
export class UsuarioService {

  private _usuario;
 
  constructor(private http: HttpClient,
    private messageService: MessagesService) { }

  get usuario() {
    return this._usuario;
  }

  getUsuario(email): Observable<any> {
    return this.http.get(`${environment.proyectoServiceHost}/api/usuario/${email}`)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)),
            tap( usuario => this._usuario = usuario ));
  }

  getProyecto(idEscenario, idUsuario): Observable<any> {
    return this.http.get(`${environment.proyectoServiceHost}/api/escenario/${idEscenario}/usuario/${idUsuario}/proyecto`)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

  matricular(usuario,curso){
    return this.http.post(`${environment.proyectoServiceHost}/api/usuario/${usuario.id}/matricular`, curso)
    .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

}

