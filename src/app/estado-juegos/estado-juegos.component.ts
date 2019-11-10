import { Component, OnInit } from '@angular/core';
import { EscenariosService } from '../escenarios.service';
import { CursosService } from '../cursos.service';
import { zip, of } from "rxjs";
import { switchMap, map, flatMap, combineAll } from 'rxjs/operators';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-estado-juegos',
  templateUrl: './estado-juegos.component.html',
  styleUrls: ['./estado-juegos.component.css']
})
export class EstadoJuegosComponent implements OnInit {
  cursosTree;
  escenarios: Array<any>;
  usuario;

  constructor(private escenariosService: EscenariosService,
    private cursosService: CursosService,
    private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.getCursosPorEscenario();
    this.usuario = this.usuarioService.usuario;
  }

  getCursosPorEscenario() {
    const $cursos = this.cursosService.getCursos();
    const $escenarios = this.escenariosService.getEscenarios();

    const $escenariosConCursos = $escenarios.pipe(
      switchMap(escenarios => {
        const $escenarios = escenarios.map(escenario => {
          return this.escenariosService.getCursosEscenario(escenario.id).pipe(
            map(cursosPorEscenario => {
              escenario.cursos = cursosPorEscenario
              return escenario;
            })
          )
        })
        return zip(...$escenarios);
      })
    );

    zip($cursos, $escenariosConCursos).subscribe(([cursos, escenariosConCursos]) => {
      var cursosTree = cursos.map(curso => {
        curso.escenarios = escenariosConCursos.filter((escenario: any) => escenario.cursos.find(c => c.nombre === curso.nombre))
        return curso;
      });
      cursosTree.forEach(curso => {
        curso.escenarios.forEach(escenario => {
          this.escenariosService.getDetalleEscenarioUsuariosPorCurso(escenario.id, curso.id)
            .subscribe(escenarioCurso => escenario.escenarioCurso = escenarioCurso)
        })
      })
      this.cursosTree = cursosTree;
    })

  }


}
