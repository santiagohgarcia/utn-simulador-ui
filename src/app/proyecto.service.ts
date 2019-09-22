import { Injectable, Component } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MessagesService } from './messages.service';

@Injectable()
export class ProyectoService {

  constructor(private http: HttpClient,
    private messageService: MessagesService) { }

  getEstado(idProyecto): Observable<any> {
    return this.http.get(`${environment.proyectoServiceHost}/api/proyecto/${idProyecto}/estado/actual`)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

  getEstadoBase(idProyecto): Observable<any> {
    return this.http.get(`${environment.proyectoServiceHost}/api/proyecto/${idProyecto}/estado/base`)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

  getEstados(proyectoId): Observable<any> {
    return this.http.get(`${environment.proyectoServiceHost}/api/proyecto/${proyectoId}/estado`)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

  forecast(idProyecto, forecast) {
    return this.http.post(`${environment.proyectoServiceHost}/api/proyecto/${idProyecto}/forecast`, forecast)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

  modalidadCobro(idProyecto, modalidadCobro) {
    return this.http.post(`${environment.proyectoServiceHost}/api/proyecto/${idProyecto}/modalidadCobro`, modalidadCobro)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

  simular(idProyecto, opciones) {
    return this.http.post(`${environment.proyectoServiceHost}/api/proyecto/${idProyecto}/simularOpciones`, opciones)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

  getFlujoFondos(idProyecto): Observable<any> {
    return this.http.get(`${environment.proyectoServiceHost}/api/proyecto/${idProyecto}/flujo-fondo-forecast`)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

  getPresupuestoFinanciero(idProyecto): Observable<any> {
    return this.http.get(`${environment.proyectoServiceHost}/api/proyecto/${idProyecto}/presupuesto-financiero-forecast`)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }  

  getPeriodoActual(idProyecto) {
    return this.getEstadoBase(idProyecto).pipe(map(estado => estado.proyecto.escenario.maximosPeriodos))
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

  getDecisiones(idProyecto): Observable<any> {
    return this.http.get(`${environment.proyectoServiceHost}/api/proyecto/${idProyecto}/decisiones`)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

  getForecast(idProyecto) {
    return this.http.get(`${environment.proyectoServiceHost}/api/proyecto/${idProyecto}/forecast`)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

  getModalidadCobro(idProyecto) {
    return this.http.get(`${environment.proyectoServiceHost}/api/proyecto/${idProyecto}/modalidadCobro`)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

}

