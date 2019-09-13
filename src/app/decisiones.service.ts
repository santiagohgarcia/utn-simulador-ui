import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class DecisionesService {

  constructor(private http: HttpClient, private messageService: MessagesService) { }

  getDecisiones(idProyecto): Observable<any> {
    return this.http.get(`${environment.proyectoServiceHost}/api/proyecto/${idProyecto}/decisiones`)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

  getDecision(idProyecto, idDecision) {
    return this.http.get(`${environment.proyectoServiceHost}/api/proyecto/${idProyecto}/decisiones`)
      .pipe(map((decisiones: Array<any>) => {
        return decisiones.find(d => d.id === idDecision);
      }));
  }

  createDecision(decision) {
    return this.http.post(`${environment.proyectoServiceHost}/api/decisiones`, decision)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

  modifyDecision(decision) {
    return this.http.put(`${environment.proyectoServiceHost}/api/decisiones/${decision.id}`, decision)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

  removeDecision(idDecision) {
    return this.http.delete(`${environment.proyectoServiceHost}/api/decisiones/${idDecision}`)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

}
