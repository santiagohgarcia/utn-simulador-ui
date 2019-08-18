import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../proyecto.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-decisiones',
  templateUrl: './decisiones.component.html',
  styleUrls: ['./decisiones.component.css']
})
export class DecisionesComponent implements OnInit {

  decisiones: Array<any>;

  constructor(private proyectoService: ProyectoService) { }

  ngOnInit() {
    this.getDecisiones();
  }

  getDecisiones() {
   this.proyectoService.getDecisionesByProyecto(1).subscribe( decisiones => {
      this.decisiones = decisiones;
   });
  }

  removeDecision(id){
      this.proyectoService.removeDecision(id).subscribe(_ => this.getDecisiones());
  }



}
