import { Component, OnInit } from '@angular/core';
import { EscenariosService } from '../escenarios.service';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-simulaciones',
  templateUrl: './simulaciones.component.html',
  styleUrls: ['./simulaciones.component.css']
})
export class SimulacionesComponent implements OnInit {
  usuario;
  escenarios;

  constructor(private escenariosService: EscenariosService, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
    this.getEscenarios(this.usuario.id);
  }

  getEscenarios(idUsuario){
    this.escenariosService.getEscenariosParaUsuario(idUsuario).subscribe(escenarios => this.escenarios = escenarios)
  }

}
