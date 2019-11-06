import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../proyecto.service';
import { EscenariosService } from '../escenarios.service';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-escenarios',
  templateUrl: './escenarios.component.html',
  styleUrls: ['./escenarios.component.css']
})
export class EscenariosComponent implements OnInit {
  usuario;
  escenarios: Array<any>;

  constructor(private escenariosService: EscenariosService,private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
    this.getEscenarios();
  }

  getEscenarios(){
    this.escenariosService.getEscenarios().subscribe(escenarios => this.escenarios = escenarios)
  }

  deleteEscenario(id){
    this.escenariosService.deleteEscenario(id).subscribe(_ => this.getEscenarios())
  }

  duplicateEscenario(escenario){
    this.escenariosService.duplicateEscenario(escenario).subscribe(_ => this.getEscenarios())
  }

}
