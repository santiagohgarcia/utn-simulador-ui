import { Component, OnInit } from '@angular/core';
import { EscenariosService } from '../escenarios.service';

@Component({
  selector: 'app-estado-juegos',
  templateUrl: './estado-juegos.component.html',
  styleUrls: ['./estado-juegos.component.css']
})
export class EstadoJuegosComponent implements OnInit {

  escenarios: Array<any>;
  forecasts=[{
    proyectoId: 1,
    periodo: 0,
    cantidadUnidades: 0,
    precio: 0
  },{
    proyectoId: 1,
    periodo: 1,
    cantidadUnidades: 0,
    precio: 0
  },{
    proyectoId: 1,
    periodo: 2,
    cantidadUnidades: 0,
    precio: 0
  }]

  constructor(private escenariosService: EscenariosService) { }

  ngOnInit() {
    this.getEscenarios();
  }

  getEscenarios(){
    this.escenariosService.getEscenarios().subscribe(escenarios => this.escenarios = escenarios)
  }


}
