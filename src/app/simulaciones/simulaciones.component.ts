import { Component, OnInit } from '@angular/core';
import { EscenariosService } from '../escenarios.service';
import { UsuarioService } from '../usuario.service';
import { zip, of } from "rxjs";
import { switchMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simulaciones',
  templateUrl: './simulaciones.component.html',
  styleUrls: ['./simulaciones.component.css']
})
export class SimulacionesComponent implements OnInit {
  usuario;
  escenarios;

  constructor(private escenariosService: EscenariosService, private usuarioService: UsuarioService,private router: Router) { }

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
    this.getEscenarios(this.usuario.id);
    if(this.usuario.rol === "ADMIN"){
      this.router.navigateByUrl("/estado-juegos");
    }
  }

  getEscenarios(idUsuario) {
    const $escenarios = this.escenariosService.getEscenariosParaUsuario(idUsuario);

    const $escenariosConProyectos = $escenarios.pipe(
      switchMap(escenarios => {
        const $escenarios = escenarios.map(escenario => {
          var $proyecto = this.usuarioService.getProyecto(escenario.id, idUsuario);
          var $escenarioCurso = this.escenariosService.getDetalleEscenarioUsuariosPorCurso(escenario.id, this.usuario.curso.id);
          return zip($proyecto, $escenarioCurso).pipe(
            map(([proyecto, escenarioCurso]) => {
              escenario.proyecto = proyecto;
              escenario.escenarioCurso = escenarioCurso;
              return escenario;
            })
          );
        })
        return zip(...$escenarios);
      }));

    $escenariosConProyectos.subscribe(escenarios => this.escenarios = escenarios);
  }

}
