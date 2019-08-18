import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../proyecto.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-toma-desiciones',
  templateUrl: './toma-desiciones.component.html',
  styleUrls: ['./toma-desiciones.component.css']
})
export class TomaDesicionesComponent implements OnInit {


  decisiones: Array<any>;

   constructor(private proyectoService: ProyectoService) { }

  ngOnInit() {
    this.getDecisionesByProyecto();
  }

  getDecisionesByProyecto() {
    this.proyectoService.getDecisionesByProyecto(1)
      .subscribe( decisiones => this.decisiones = decisiones); //TODO: sacar hardcode de proyecto
  }

  getDecisionesTomadas(){
    return this.decisiones.filter( d => d.opcionSeleccionada ).length;
  }


}
