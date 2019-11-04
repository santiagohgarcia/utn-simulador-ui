import { Component, OnInit } from '@angular/core';
import { EscenariosService } from '../escenarios.service';
import { UsuarioService } from '../usuario.service';
import { switchMap, map, filter } from 'rxjs/operators';
import { zip } from 'rxjs';

@Component({
  selector: 'app-premios',
  templateUrl: './premios.component.html',
  styleUrls: ['./premios.component.css']
})
export class PremiosComponent implements OnInit {

  usuario;
  escenarios;

  constructor(private escenariosService: EscenariosService, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
    this.getEscenarios(this.usuario.id, this.usuario.curso.id);
  }

  getEscenarios(idUsuario, cursoId) {
    const $escenarios = this.escenariosService.getEscenariosParaUsuario(idUsuario);

    const $escenariosConProyectos = $escenarios.pipe(
      switchMap(escenarios => {
        const $escenarios = escenarios.map(escenario => {
          var $proyecto = this.usuarioService.getProyecto(escenario.id, idUsuario);
          var $escenarioCurso = this.escenariosService.getDetalleEscenarioUsuariosPorCurso(escenario.id, cursoId);
          return zip($proyecto, $escenarioCurso).pipe(
            map(([proyecto, escenarioCurso]) => {
              escenario.proyecto = proyecto;
              escenario.escenarioCurso = escenarioCurso;
              escenario.podio = this._jugadoresToPodio(escenarioCurso.jugadores);
              return escenario;
            })
          );
        })
        return zip(...$escenarios);
      }));

    $escenariosConProyectos.subscribe(escenarios => this.escenarios = escenarios);
  }

  _jugadoresToPodio(jugadores) {
    return {
      primerPuesto: jugadores[0],
      segundoPuesto: jugadores[1],
      tercerPuesto: jugadores[2]
    }
  }

}
