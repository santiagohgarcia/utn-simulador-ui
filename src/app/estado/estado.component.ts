import { Component, OnInit } from '@angular/core';
import { ProyectoService } from "../proyecto.service";
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit {

  estadoProyecto$: Observable<any>;

  constructor(private proyectoService: ProyectoService) { }

  ngOnInit() {
    this.updateEstado();
  }

  updateEstado() {
    this.estadoProyecto$ = this.proyectoService.getEstado();
  }



}
