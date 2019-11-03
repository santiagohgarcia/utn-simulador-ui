import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from '../cursos.service';
import { EscenariosService } from '../escenarios.service';
import { MessagesService } from '../messages.service';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.css']
})
export class RankingsComponent implements OnInit {
  @Input() escenario: any;
  @Input() curso: any;

  ventasChartProps;
  jugadores;
  puntajes;

  constructor(private route: ActivatedRoute, private cursosService: CursosService,
    private escenariosService: EscenariosService,
    private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.getCurso(this.usuarioService.usuario.cursoId);
    this.getDetalleEscenarioUsuariosPorCurso(this.escenario.id, this.curso.id);
    this.getPuntajes(this.escenario.id)
    this.setVentasChartProps();
  }

  getCurso(cursoId) {
    this.cursosService.getCurso(cursoId).subscribe(curso => this.curso = curso)
  }

  getDetalleEscenarioUsuariosPorCurso(escenarioId, cursoId) {
    this.escenariosService.getDetalleEscenarioUsuariosPorCurso(escenarioId, cursoId).subscribe(jugadores => this.jugadores = jugadores)
  }

  getPuntajes(escenarioId) {
    this.escenariosService.getPuntajes(escenarioId).subscribe(puntajes => {
      if (puntajes) {
        this.puntajes = puntajes;
      }
    })
  }

  setVentasChartProps() {
    this.ventasChartProps = {
      options: {
        scaleShowVerticalLines: false,
        responsive: true,
        aspectRatio: 3
      },
      labels: [
        "Ron Swanson",
        "Leslie Knope",
        "Perd Hapley",
        "Tom Haveford",
        "Pam Beasly",
        "Donna",
        "Garry Gergich",
        "Ben Wyatt"
      ],
      type: 'horizontalBar',
      legend: false,
      data: [
        {
          data: [2000, 1800, 1600, 1400, 1300, 1200, 1000, 800],
          label: 'Ventas',
          backgroundColor: [
            "rgba(75, 192, 192, 0.5)",
            "rgba(75, 192, 192, 0.5)",
            "rgba(75, 192, 192, 0.5)",
            "rgba(255, 205, 86, 0.5)",
            "rgba(255, 205, 86, 0.5)",
            "rgba(255, 205, 86, 0.5)",
            "rgba(255, 99, 132, 0.5)",
            "rgba(255, 99, 132, 0.5)"
          ],
          borderColor: [
            "rgb(75, 192, 192)",
            "rgb(75, 192, 192)",
            "rgb(75, 192, 192)",
            "rgb(255, 205, 86)",
            "rgb(255, 205, 86)",
            "rgb(255, 205, 86)",
            "rgb(255, 99, 132)",
            "rgb(255, 99, 132)"
          ]
        }
      ]
    }
  }

}
