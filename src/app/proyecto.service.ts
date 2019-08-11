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

  getFlujoFondos(id) : Observable<any> {
    return of({
      "INGRESOS_AFECTOS_A_IMPUESTOS": {
        "descripcion": "Ingresos Afectos a Impuestos",
        "cuentas": [
          {
            "id": "1",
            "descripcion": "Venta Equipo",
            "montosPeriodo": [
              {
                "periodo": 5,
                "monto": 100
              }
            ]
          }
        ]
      },
      "EGRESOS_AFECTOS_A_IMPUESTOS": {
        "descripcion": "Ingresos Afectos a Impuestos",
        "cuentas": [
          {
            "id": "2",
            "descripcion": "Costos de Operación",
            "montosPeriodo": [
              {
                "periodo": 1,
                "monto": 800
              },
              {
                "periodo": 2,
                "monto": 800
              },
              {
                "periodo": 3,
                "monto": 800
              },
              {
                "periodo": 4,
                "monto": 800
              }
            ]
          }
        ]
      },
      "GASTOS_NO_DESEMBOLSABLES": {
        "descripcion": "Depreciación",
        "cuentas": [
          {
            "id": "2",
            "descripcion": "Costos de Operación",
            "montosPeriodo": [
              {
                "periodo": 1,
                "monto": 140
              },
              {
                "periodo": 2,
                "monto": 112
              },
              {
                "periodo": 3,
                "monto": 89.6
              },
              {
                "periodo": 4,
                "monto": 71.68
              },
              {
                "periodo": 5,
                "monto": 57.34
              }
            ]
          }
        ]
      },
      "UTILIDAD_NETA_ANTES_DE_IMPUESTOS": {
        "descripcion": "Utilidad Neta Antes de Impuestos",
        "montosPeriodo": [
          {
            "periodo": 1,
            "monto": -940
          },
          {
            "periodo": 2,
            "monto": -912
          },
          {
            "periodo": 3,
            "monto": -889.6
          },
          {
            "periodo": 4,
            "monto": -871.68
          },
          {
            "periodo": 5,
            "monto": -757.34
          }
        ]
      },
      "IMPUESTOS": {
        "descripcion": "Impuestos",
        "montosPeriodo": [
          {
            "periodo": 1,
            "monto": -329
          },
          {
            "periodo": 2,
            "monto": -319.2
          },
          {
            "periodo": 3,
            "monto": -311.36
          },
          {
            "periodo": 4,
            "monto": -305.09
          },
          {
            "periodo": 5,
            "monto": -265.07
          }
        ]
      },
      "UTILIDAD_DESPUES_DE_IMPUESTOS": {
        "descripcion": "Utilidad Despues de Impuestos",
        "montosPeriodo": [
          {
            "periodo": 1,
            "monto": -611
          },
          {
            "periodo": 2,
            "monto": -592.8
          },
          {
            "periodo": 3,
            "monto": -578.24
          },
          {
            "periodo": 4,
            "monto": -566.59
          },
          {
            "periodo": 5,
            "monto": -492.27
          }
        ]
      },
      "AJUSTE_DE_GASTOS_NO_DESEMBOLSABLES": {
        "descripcion": "Ajuste de Gastos No Desembolsables",
        "cuentas": [
          {
            "id": "2",
            "descripcion": "Costos de Operación",
            "montosPeriodo": [
              {
                "periodo": 1,
                "monto": 140
              },
              {
                "periodo": 2,
                "monto": 112
              },
              {
                "periodo": 3,
                "monto": 89.6
              },
              {
                "periodo": 4,
                "monto": 71.68
              },
              {
                "periodo": 5,
                "monto": 57.34
              }
            ]
          }
        ]
      },
      "FLUJO_DE_FONDOS": {
        "descripcion": "FLUJO DE FONDOS",
        "montosPeriodo": [
          {
            "periodo": 1,
            "monto": -471
          },
          {
            "periodo": 2,
            "monto": -480.8
          },
          {
            "periodo": 3,
            "monto": -488.64
          },
          {
            "periodo": 4,
            "monto": -494.91
          },
          {
            "periodo": 5,
            "monto": -434.93
          }
        ]
      }
    }
    )
  }

}
