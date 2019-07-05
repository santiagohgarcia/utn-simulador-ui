import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProyectService {

  constructor(private http: HttpClient) { }

  decisions = [
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

  getStatus() {
    return this.http.get(`${environment.proyectServiceHost}/api/estado/actual`);
  }

  simulate(status) {
    return this.http.post(`${environment.proyectServiceHost}/api/estado`, status);
  }

  getDecisions() {
    return Observable.of(this.decisions);
  }

  getDecision(id) {
    return Observable.of(this._findDecisionById(id));
  }

  addDecision(decision){
    this.decisions.push(decision);
    return Observable.of(decision);
  }

  updateDecision(decision){
    let index = this.decisions.indexOf(this._findDecisionById(decision.id));
    this.decisions[index] = decision;
    return Observable.of(decision);
  }

  removeDecision(id){
    var index = this.decisions.indexOf(this._findDecisionById(id));
    this.decisions.splice(index, 1);
    return Observable.of(null);
  }

  _findDecisionById(id){
    return this.decisions.find( d => d.id === id);
  }

}
