import { Component, OnInit } from '@angular/core';
import { EscenariosService } from '../escenarios.service';
import { UsuarioService } from '../usuario.service';
import { zip, of } from "rxjs";
import { switchMap, map } from 'rxjs/operators';

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

  getEscenarios(idUsuario) {
    const $escenarios = this.escenariosService.getEscenariosParaUsuario(idUsuario);

    const $escenariosConProyectos = $escenarios.pipe(
      switchMap(escenarios => {
        const $escenarios = escenarios.map(escenario => {
          return this.usuarioService.getProyecto(escenario.id, idUsuario).pipe(
            map(proyecto => {
              escenario.proyecto = proyecto;
              return escenario;
            })
          )
        })
        return zip(...$escenarios);
      }));

    $escenariosConProyectos.subscribe(escenarios => this.escenarios = escenarios);
  }

}
