import { Component, OnInit } from '@angular/core';
import { EscenariosService } from '../escenarios.service';

@Component({
  selector: 'app-simulaciones',
  templateUrl: './simulaciones.component.html',
  styleUrls: ['./simulaciones.component.css']
})
export class SimulacionesComponent implements OnInit {

  escenarios;

  constructor(private escenariosService: EscenariosService) { }

  ngOnInit() {
    this.getEscenarios();
  }

  getEscenarios(){
    this.escenariosService.getEscenarios().subscribe(escenarios => this.escenarios = escenarios)
  }

}
