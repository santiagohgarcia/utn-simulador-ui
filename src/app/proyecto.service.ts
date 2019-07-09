import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class ProyectoService {

  constructor(private http: HttpClient) { }

  decisiones = [
    {
      id: 1,
      descripcion: "Cuanto quiere invertir en publicidad?",
      respuestas: [{
        descripcion: "Invertir $2000",
        consecuencias: [{
          cuenta: "Caja",
          valor: 20
        },{
          cuenta: "Stock",
          valor: 20
        },{
          cuenta: "Ventas",
          valor: 20
        },{
          cuenta: "Caja",
          valor: 20
        }]
      }, {
        descripcion: "Invertir $3000"
      }, {
        descripcion: "Invertir $4000"
      }]
    },
    {
      id: 2,
      descripcion: "Cuanto quiere invertir en cosas?",
      respuestas: [{
        descripcion: "Invertir $2000"
      }, {
        descripcion: "Invertir $3000"
      }, {
        descripcion: "Invertir $4000"
      }]
    },
    {
      id: 3,
      descripcion: "Cuanto quiere invertir en comida para perro?",
      respuestas: [{
        descripcion: "Invertir $2000"
      }, {
        descripcion: "Invertir $3000"
      }, {
        descripcion: "Invertir $4000"
      }]
    },
    {
      id: 3,
      descripcion: "Cuanto quiere invertir en otras cosas?",
      respuestas: [{
        descripcion: "Invertir $2000"
      }, {
        descripcion: "Invertir $3000"
      }, {
        descripcion: "Invertir $4000"
      }]
    }

  ]

  getEstado() {
    return this.http.get(`${environment.proyectoServiceHost}/api/estado/actual`);
  }

  simular(status) {
    return this.http.post(`${environment.proyectoServiceHost}/api/estado`, status);
  }

  getDecisiones() {
    return of(this.decisiones);
  }

  getDecision(id) {
    return of(this._findDecisionById(id));
  }

  addDecision(decision){
    this.decisiones.push(decision);
    return of(decision);
  }

  updateDecision(decision){
    let index = this.decisiones.indexOf(this._findDecisionById(decision.id));
    this.decisiones[index] = decision;
    return of(decision);
  }

  removeDecision(id){
    var index = this.decisiones.indexOf(this._findDecisionById(id));
    this.decisiones.splice(index, 1);
    return of(null);
  }

  _findDecisionById(id){
    return this.decisiones.find( d => d.id === id);
  }

}
