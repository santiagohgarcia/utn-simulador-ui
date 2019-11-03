import { Injectable, Component } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MessagesService } from './messages.service';
import { descripcionesTipoCuentas, descripcionesTipoFlujoFondos } from './valores-dominio';

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
    return this.http.get(`${environment.proyectoServiceHost}/api/proyecto/${proyectoId}/estado-forecast`)
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

  proveedorSeleccionado(idProyecto, proveedorSeleccionado) {
    return this.http.post(`${environment.proyectoServiceHost}/api/proyecto/${idProyecto}/proveedor`, proveedorSeleccionado)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

  simular(idProyecto, opciones) {
    return this.http.post(`${environment.proyectoServiceHost}/api/proyecto/${idProyecto}/simular-forecast`, opciones)
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

  getPresupuestoEconomico(idProyecto): Observable<any> {
    return this.http.get(`${environment.proyectoServiceHost}/api/proyecto/${idProyecto}/presupuesto-economico-forecast`)
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
  
  getProveedores(idProyecto): Observable<any> {
    return this.http.get(`${environment.proyectoServiceHost}/api/proyecto/${idProyecto}/proveedor`)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

  getTipoCuentas() {
    return this.http.get(`${environment.proyectoServiceHost}/api/tipoCuentas`)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)),
        map(tipoCuentas => tipoCuentas.map(tipoCuenta => {
          return {
            key: tipoCuenta,
            descripcion: descripcionesTipoCuentas[tipoCuenta]
          }
        })));
  }

  getTipoFlujoFondos() {
    return this.http.get(`${environment.proyectoServiceHost}/api/tipoFlujoFondos`)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)),
        map(tipoFlujoFondos => tipoFlujoFondos.map(tipoFlujoFondo => {
          return {
            key: tipoFlujoFondo,
            descripcion: descripcionesTipoFlujoFondos[tipoFlujoFondo]
          }
        })));
  }

  getBalanceFinal(idProyecto) {
    return this.http.get(`${environment.proyectoServiceHost}/api/proyecto/${idProyecto}/balance-final-forecast`)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

  getCredito(idProyecto): Observable<any> {
    return this.http.get(`${environment.proyectoServiceHost}/api/proyecto/${idProyecto}/financiacionTomado`)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

  tomarCredito(credito){
    return this.http.post(`${environment.proyectoServiceHost}/api/proyecto/${credito.proyectoId}/credito`, credito)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

  entregarProyecto(idProyecto) {
    return this.http.post(`${environment.proyectoServiceHost}/api/proyecto/${idProyecto}/entregar`, {})
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

}

