import { Injectable, Component } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ProyectoService {

  constructor(private http: HttpClient,
    private _snackBar: MatSnackBar) { }

  decisiones = [
    {
      id: 1,
      descripcion: "Cuanto quiere invertir en publicidad?",
      opcionSeleccionada: 2,
      opciones: [{
        id: 1,
        descripcion: "Invertir $2000",
        consecuencias: [{
          cuenta: "Caja",
          valor: 20
        }, {
          cuenta: "Stock",
          valor: 20
        }, {
          cuenta: "Ventas",
          valor: 20
        }, {
          cuenta: "Caja",
          valor: 20
        }]
      }, {
        id:2,
        descripcion: "Invertir $3000"
      }, {
        id:3,
        descripcion: "Invertir $4000"
      }]
    },
    {
      id: 2,
      descripcion: "Cuanto quiere invertir en cosas?",
      opciones: [{
        id: 1,
        descripcion: "Invertir $2000"
      }, {
        id: 2,
        descripcion: "Invertir $3000"
      }, {
        id: 3,
        descripcion: "Invertir $4000"
      }]
    },
    {
      id: 3,
      descripcion: "Cuanto quiere invertir en comida para perro?",
      opciones: [{
        id: 1,
        descripcion: "Invertir $2000"
      }, {
        id: 2,
        descripcion: "Invertir $3000"
      }, {
        id: 3,
        descripcion: "Invertir $4000"
      }]
    },
    {
      id: 3,
      descripcion: "Cuanto quiere invertir en otras cosas?",
      opciones: [{
        id: 1,
        descripcion: "Invertir $2000"
      }, {
        id: 2,
        descripcion: "Invertir $3000"
      }, {
        id: 3,
        descripcion: "Invertir $4000"
      }]
    }

  ]

  getEstado(): Observable<any>  {
    return this.http.get(`${environment.proyectoServiceHost}/api/estado/actual`);
  }

  getEstados(proyectoId): Observable<any>  {
    return this.http.get(`${environment.proyectoServiceHost}/api/proyecto/${proyectoId}/estado`);
  }

  simular(status) {
    return this.http.post(`${environment.proyectoServiceHost}/api/estado`, status);
  }

  getDecision(id) {
    return of(this._findDecisionById(id));
  }

  addDecision(decision) {
    this.decisiones.push(decision);
    return of(decision);
  }

  updateDecision(decision) {
    let index = this.decisiones.indexOf(this._findDecisionById(decision.id));
    this.decisiones[index] = decision;
    return of(decision);
  }

  removeDecision(id) {
    var index = this.decisiones.indexOf(this._findDecisionById(id));
    this.decisiones.splice(index, 1);
    return of(null);
  }

  _findDecisionById(id) {
    return this.decisiones.find(d => d.id === id);
  }

  getFlujoFondos(idProyecto) : Observable<any> {
    return this.http.get(`${environment.proyectoServiceHost}/api/proyecto/${idProyecto}/flujo-fondo`);
  }

  getDecisionesByProyecto(idProyecto) : Observable<any>{
    return this.http.get(`${environment.proyectoServiceHost}/api/proyecto/${idProyecto}/decisiones`);
  }

  getPeriodoActual(idProyecto){
    return this.getEstado().pipe( map(estado => estado.periodo) );
  }

  tomarDecision(idProyecto,idOpcion){
    return this.http.post(`${environment.proyectoServiceHost}/api/proyecto/${idProyecto}/opcion/${idOpcion}/toma-decision`,{});
  }

//TODO: handle errors with snack bar
/*  _openSnackBar() {
    this._snackBar.openFromComponent(ErrorSnackBarComponent, {
      duration: 1000,
    });
  }
*/
}
/*
@Component({
  selector: 'error-snack-bar',
  templateUrl: 'error-snack-bar.html',
  styles: [`
    .error-snack-bar {
      color: red;
    }
  `],
})
export class ErrorSnackBarComponent {}
*/