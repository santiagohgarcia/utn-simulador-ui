import { Component, OnInit } from '@angular/core';
import { ProyectoService } from "../proyecto.service";
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-simulaciones',
  templateUrl: './simulaciones.component.html',
  styleUrls: ['./simulaciones.component.css']
})
export class SimulacionesComponent implements OnInit {

  estadoProyecto$: Observable<any>;

  constructor(private proyectoService: ProyectoService) { }

  ngOnInit() {
    this.updateEstado();
  }

  updateEstado() {
    this.estadoProyecto$ = this.proyectoService.getEstado();
  }

  onSimulate() {
    this.estadoProyecto$.subscribe(status => {
      this.proyectoService.simular(status).subscribe(_ => this.updateEstado() )
    });
  }

}
