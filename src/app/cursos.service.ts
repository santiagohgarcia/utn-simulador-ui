import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MessagesService } from './messages.service';
import { environment } from '../environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private http: HttpClient, private messageService: MessagesService) { }

  getCursos() {
    return this.http.get(`${environment.proyectoServiceHost}/api/curso`)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

  getCurso(cursoId) {
    return this.http.get(`${environment.proyectoServiceHost}/api/curso`)
      .pipe(
        map((cursos: Array<any>) => cursos.find(c => c.id === cursoId)),
        catchError(this.messageService.catchError.bind(this.messageService)));
  }

  removeCurso(curso) {
    return this.http.delete(`${environment.proyectoServiceHost}/api/curso/${curso.id}`)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

  createCurso(curso) {
    return this.http.post(`${environment.proyectoServiceHost}/api/curso`, curso)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

  modifyCurso(curso) {
    return this.http.put(`${environment.proyectoServiceHost}/api/curso/${curso.id}`, curso)
      .pipe(catchError(this.messageService.catchError.bind(this.messageService)));
  }

}
