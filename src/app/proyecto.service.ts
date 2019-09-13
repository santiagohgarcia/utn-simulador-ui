import { Injectable, Component } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ProyectoService {

  constructor(private http: HttpClient,
    private _snackBar: MatSnackBar) { }

  getEstado(idProyecto): Observable<any>  {
    return this.http.get(`${environment.proyectoServiceHost}/api/proyecto/${idProyecto}/estado/actual`);
  }

  getEstados(proyectoId): Observable<any>  {
    return this.http.get(`${environment.proyectoServiceHost}/api/proyecto/${proyectoId}/estado`);
  }

  forecast(idProyecto,forecast){
    return this.http.post(`${environment.proyectoServiceHost}/api/proyecto/${idProyecto}/forecast`, forecast);
  }

  simular(idProyecto,opciones) {
    return this.http.post(`${environment.proyectoServiceHost}/api/proyecto/${idProyecto}/simularOpciones`, opciones);
  }

  getFlujoFondos(idProyecto) : Observable<any> {
    return this.http.get(`${environment.proyectoServiceHost}/api/proyecto/${idProyecto}/flujo-fondo`);
  }

  getPeriodoActual(idProyecto){
    return this.getEstado(idProyecto).pipe( map(estado => estado.proyecto.escenario.maximosPeriodos) );
  }
  
}

