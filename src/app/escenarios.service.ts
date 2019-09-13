import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EscenariosService {

  constructor(private http: HttpClient) { }

  getEscenarios(): Observable<any>{
    return this.http.get(`${environment.proyectoServiceHost}/api/escenarios`);
  }

  getEscenario(id): Observable<any>{
    return this.http.get(`${environment.proyectoServiceHost}/api/escenarios/${id}`);
  }

  modifyEscenario(escenario) {
    return this.http.put(`${environment.proyectoServiceHost}/api/escenarios/${escenario.id}`,escenario);
  }

  createEscenario(escenario) {
    delete escenario.id;
    return this.http.post(`${environment.proyectoServiceHost}/api/escenarios`,escenario);
  }

  deleteEscenario(id): Observable<any>{
    return this.http.delete(`${environment.proyectoServiceHost}/api/escenarios/${id}`);
  }
}
