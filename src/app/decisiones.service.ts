import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DecisionesService {

  constructor(private http: HttpClient) { }

  getDecisiones(idProyecto) : Observable<any>{
    return this.http.get(`${environment.proyectoServiceHost}/api/proyecto/${idProyecto}/decisiones`);
  }
  
  getDecision(idProyecto,idDecision) {
    return this.http.get(`${environment.proyectoServiceHost}/api/proyecto/${idProyecto}/decisiones`)
      .pipe( map((decisiones: Array<any>) => {
        return decisiones.find(d => d.id === idDecision);
      }) );
  }

  createDecision(decision) {
    return this.http.post(`${environment.proyectoServiceHost}/api/decisiones`,decision);
  }

  modifyDecision(decision) {
    return this.http.put(`${environment.proyectoServiceHost}/api/decisiones/${decision.id}`,decision);
  }

  removeDecision(idDecision) {
    return this.http.delete(`${environment.proyectoServiceHost}/api/decisiones/${idDecision}`);
  }

}
