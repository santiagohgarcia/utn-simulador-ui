import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../proyecto.service';
import { EscenariosService } from '../escenarios.service';

@Component({
  selector: 'app-escenarios',
  templateUrl: './escenarios.component.html',
  styleUrls: ['./escenarios.component.css']
})
export class EscenariosComponent implements OnInit {

  escenarios: Array<any>;

  constructor(private escenariosService: EscenariosService) { }

  ngOnInit() {
    this.getEscenarios();
  }

  getEscenarios(){
    this.escenariosService.getEscenarios().subscribe(escenarios => this.escenarios = escenarios)
  }

  deleteEscenario(id){
    this.escenariosService.deleteEscenario(id).subscribe(_ => this.getEscenarios())
  }

}
