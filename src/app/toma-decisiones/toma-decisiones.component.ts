import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../proyecto.service';
import { MatRadioChange } from '@angular/material';

@Component({
  selector: 'app-toma-decisiones',
  templateUrl: './toma-decisiones.component.html',
  styleUrls: ['./toma-decisiones.component.css']
})
export class TomaDecisionesComponent implements OnInit {


  decisiones: Array<any> = [];
  estado;
  periodos: Array<any> = [];

  constructor(private proyectoService: ProyectoService) { }

  ngOnInit() {
    this.getDecisionesByProyecto();
    this.getEstado();
    this.getPeriodos();
  }

  getEstado(){
    this.proyectoService.getEstado().subscribe( estado => this.estado = estado );
  }

  getDecisionesByProyecto() {
    this.proyectoService.getDecisionesByProyecto(1)
      .subscribe( decisiones => this.decisiones = decisiones);
  }

  getPeriodos(){
    this.proyectoService.getPeriodoActual(1).subscribe(periodoActual => {
          this.periodos = [...Array(periodoActual).keys(),periodoActual];
    })
  }

  getDecisionesTomadas(){
    return this.decisiones ? this.decisiones.filter( d => d.opcionTomada ).length : 0;
  }

  tomarDecision(evt: MatRadioChange){
    this.proyectoService.tomarDecision(1,evt.value)
      .subscribe( _ => {
        this.getDecisionesByProyecto()
        this.getEstado();
      }); 
  }


}
