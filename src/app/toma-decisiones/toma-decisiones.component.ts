import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../proyecto.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-toma-decisiones',
  templateUrl: './toma-decisiones.component.html',
  styleUrls: ['./toma-decisiones.component.css']
})
export class TomaDecisionesComponent implements OnInit {


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
    return this.decisiones ? this.decisiones.filter( d => d.opcionSeleccionada ).length : 0;
  }


}
