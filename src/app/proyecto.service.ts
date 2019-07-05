import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProyectoService {

  constructor(private http: HttpClient) { }

  decisiones = [
    {
      id: 1,
      descripcion: "Cuanto quiere invertir en publicidad?",
      respuestas: [{
        descripcion: "Invertir $2000"
      }, {
        descripcion: "Invertir $3000"
      }, {
        descripcion: "Invertir $4000"
      }]
    },

  ]

  getEstado() {
    return this.http.get(`${environment.proyectoServiceHost}/api/estado/actual`);
  }

  simular(status) {
    return this.http.post(`${environment.proyectoServiceHost}/api/estado`, status);
  }

  getDecisiones() {
    return Observable.of(this.decisiones);
  }

  getDecision(id) {
    return Observable.of(this._findDecisionById(id));
  }

  addDecision(decision){
    this.decisiones.push(decision);
    return Observable.of(decision);
  }

  updateDecision(decision){
    let index = this.decisiones.indexOf(this._findDecisionById(decision.id));
    this.decisiones[index] = decision;
    return Observable.of(decision);
  }

  removeDecision(id){
    var index = this.decisiones.indexOf(this._findDecisionById(id));
    this.decisiones.splice(index, 1);
    return Observable.of(null);
  }

  _findDecisionById(id){
    return this.decisiones.find( d => d.id === id);
  }

}
