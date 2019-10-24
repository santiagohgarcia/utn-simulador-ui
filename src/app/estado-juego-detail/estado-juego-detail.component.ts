import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from '../cursos.service';
import { EscenariosService } from '../escenarios.service';

@Component({
  selector: 'app-estado-juego-detail',
  templateUrl: './estado-juego-detail.component.html',
  styleUrls: ['./estado-juego-detail.component.css']
})
export class EstadoJuegoDetailComponent implements OnInit {

  escenario;
  curso;
  ventasChartProps;
  escenarioCursos;

  forecasts = [{
    proyectoId: 1,
    periodo: 0,
    cantidadUnidades: 0,
    precio: 0
  }, {
    proyectoId: 1,
    periodo: 1,
    cantidadUnidades: 0,
    precio: 0
  }, {
    proyectoId: 1,
    periodo: 2,
    cantidadUnidades: 0,
    precio: 0
  }]

  constructor(private route: ActivatedRoute, private cursosService: CursosService, private escenariosService: EscenariosService) { }

  ngOnInit() {
    const escenarioId = Number(this.route.snapshot.paramMap.get('escenarioId'));
    const cursoId = Number(this.route.snapshot.paramMap.get('cursoId'));
    this.getCurso(cursoId)
    this.getEscenario(escenarioId);
    this.setVentasChartProps();
    this.getDetalleEscenarioUsuariosPorCurso(escenarioId, cursoId);
  }

  getCurso(cursoId) {
    this.cursosService.getCurso(cursoId).subscribe(curso => this.curso = curso)
  }

  getEscenario(escenarioId) {
    this.escenariosService.getEscenario(escenarioId).subscribe(escenario => this.escenario = escenario)
  }

  getDetalleEscenarioUsuariosPorCurso(escenarioId, cursoId) {
    this.escenariosService.getDetalleEscenarioUsuariosPorCurso(escenarioId, cursoId).subscribe(escenariosCursos => this.escenarioCursos = escenariosCursos)
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
