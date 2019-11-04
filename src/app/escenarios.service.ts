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
  getCursosPorEscenario(id: any) {
    throw new Error("Method not implemented.");
  }

  constructor(private http: HttpClient, private messageService: MessagesService) { }

  getEscenariosParaUsuario(idUsuario) {
    return this.http.get(`${environment.proyectoServiceHost}/api/escenarios/usuario/${idUsuario}`)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

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

  getCursosEscenario(idEscenario) {
    return this.http.get(`${environment.proyectoServiceHost}/api/escenarios/${idEscenario}/cursos`)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

  updateCursosEscenario(idEscenario, cursos) {
    return this.http.put(`${environment.proyectoServiceHost}/api/escenarios/${idEscenario}/cursos`, cursos)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

  getDetalleEscenarioUsuariosPorCurso(idEscenario, idCurso) {
    return this.http.get(`${environment.proyectoServiceHost}/api/escenarios/${idEscenario}/cursos/${idCurso}`)
      .pipe(map( (escenarioCurso:any) => {
        escenarioCurso.jugadores.sort((a,b) => a.puntaje > b.puntaje ? 1 : -1 )
        return escenarioCurso;
      }),catchError(this.messageService.catchError.bind(this.messageService)));
  }

  getConfiguracionMercado(escenarioId) {
    return this.http.get(`${environment.proyectoServiceHost}/api/escenario/${escenarioId}/configuracionMercado`)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)),
        map(configuracionesMercado => {
          var ponderacionesMercado = {
            precioDesde: [],
            modalidadCobro: [],
            publicidadDesde: [],
            calidadDesde: [],
            vendedoresDesde: []
          }
          configuracionesMercado.ponderacionesMercado.forEach(pm => {
            ponderacionesMercado[{
              "PRECIO_DESDE": "precioDesde",
              "MODALIDAD_DE_COBRO": "modalidadCobro",
              "PUBLICIDAD_DESDE": "publicidadDesde",
              "CALIDAD_DESDE": "calidadDesde",
              "VENDEDORES_DESDE": "vendedoresDesde",
            }[pm.concepto]].push(pm)
          })
          configuracionesMercado.ponderacionesMercado = ponderacionesMercado;
          return configuracionesMercado;
        }));
  }

  postConfiguracionesMercado(configuracionesMercado) {
    const escenarioId = configuracionesMercado.restriccionPrecio.escenarioId,
      configuracionesMercadoForPost = JSON.parse(JSON.stringify(configuracionesMercado));
    configuracionesMercadoForPost.ponderacionesMercado = [
      ...configuracionesMercadoForPost.ponderacionesMercado.precioDesde,
      ...configuracionesMercadoForPost.ponderacionesMercado.modalidadCobro,
      ...configuracionesMercadoForPost.ponderacionesMercado.publicidadDesde,
      ...configuracionesMercadoForPost.ponderacionesMercado.calidadDesde,
      ...configuracionesMercadoForPost.ponderacionesMercado.vendedoresDesde
    ]
    return this.http.post(`${environment.proyectoServiceHost}/api/escenario/${escenarioId}/configuracionMercado`, configuracionesMercadoForPost)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

  simularMercado(escenarioId, cursoId) {
    return this.http.post(`${environment.proyectoServiceHost}/api/escenario/${escenarioId}/curso/${cursoId}/simular-mercado`, {})
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

  getPuntajes(escenarioId) {
    return this.http.get(`${environment.proyectoServiceHost}/api/escenario/${escenarioId}/puntajeEscenario`)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

  postPuntajes(escenarioId, puntajes) {
    puntajes.escenarioId = escenarioId;
    return this.http.post(`${environment.proyectoServiceHost}/api/escenario/${escenarioId}/puntajeEscenario`, puntajes)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

}
