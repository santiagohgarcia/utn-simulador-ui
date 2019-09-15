import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../proyecto.service';
import { MatRadioChange } from '@angular/material';
import { Router } from '@angular/router';
import { DecisionesService } from '../decisiones.service';
import { MessagesService } from '../messages.service';


@Component({
  selector: 'app-toma-decisiones',
  templateUrl: './toma-decisiones.component.html',
  styleUrls: ['./toma-decisiones.component.css']
})
export class TomaDecisionesComponent implements OnInit {

  decisiones: Array<any> = [];
  estado;
  forecasts: Array<any> = [];

  constructor(private proyectoService: ProyectoService,
    private decisionesService: DecisionesService,
    private router: Router,
    private messageService: MessagesService) { }

  ngOnInit() {
    this.getDecisionesByProyecto();
    this.getEstado();
    this.buildForecast();
  }

  getEstado() {
    this.proyectoService.getEstado(1).subscribe(estado => this.estado = estado);
  }

  getDecisionesByProyecto() {
    this.decisionesService.getDecisiones(1)
      .subscribe(decisiones => this.decisiones = decisiones);
  }

  buildForecast() {
    this.proyectoService.getPeriodoActual(1).subscribe(periodoActual => {
      this.forecasts = [...Array(periodoActual).keys(), periodoActual].map(periodo => {
        return {
          proyectoId: 1,
          periodo: periodo,
          cantidadUnidades: 0
        }
      });
    })
  }

  getCantidadDecisionesTomadas() {
    return this.decisiones ? this.decisiones.filter(d => d.opcionTomada).length : 0;
  }

  getOpcionesTomadas() {
    return this.decisiones.map(d => d.opciones.find(o => o.id === d.opcionTomada)).filter(d => d);
  }

  simular() {
   
    this.proyectoService.forecast(1, this.forecasts)
      .subscribe(_ => {
        var opcionesTomadas = this.getOpcionesTomadas();
        if (opcionesTomadas.length === this.decisiones.length) {
          this.proyectoService.simular(1, opcionesTomadas)
            .subscribe(_ => this.router.navigateByUrl("/resultados"))
        }else{
          this.messageService.openSnackBar("Toma todas las decisiones antes de simular!");
        }
      }
      );

  }


}
