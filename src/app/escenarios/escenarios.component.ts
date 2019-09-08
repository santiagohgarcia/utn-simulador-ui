import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../proyecto.service';

@Component({
  selector: 'app-escenarios',
  templateUrl: './escenarios.component.html',
  styleUrls: ['./escenarios.component.css']
})
export class EscenariosComponent implements OnInit {

  escenarios: Array<any>;

  constructor(private proyectoService: ProyectoService) { }

  ngOnInit() {
    this.getEscenarios();
  }

  getEscenarios(){
    this.proyectoService.getEscenarios().subscribe(escenarios => this.escenarios = escenarios)
  }

  deleteEscenario(id){
    this.proyectoService.deleteEscenario(id).subscribe(_ => this.getEscenarios())
  }

}
