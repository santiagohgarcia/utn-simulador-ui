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
  jugadores;

  tablaPonderadora = {
    precioDesde: [{
      concepto: 300,
      bajo: 1,
      medio: 3,
      alto: 4
    }, {
      concepto: 300,
      bajo: 1,
      medio: 3,
      alto: 4
    }, {
      concepto: 300,
      bajo: 1,
      medio: 3,
      alto: 4
    }],
    modalidadCobro: [{
      concepto: "Contado",
      bajo: 1,
      medio: 3,
      alto: 4
    }, {
      concepto: "30 dias",
      bajo: 1,
      medio: 3,
      alto: 4
    },{
      concepto: "60 dias",
      bajo: 1,
      medio: 3,
      alto: 4
    }, {
      concepto: "90 dias",
      bajo: 1,
      medio: 3,
      alto: 4
    }],
    calidadDesde: [{
      concepto: 0,
      bajo: 1,
      medio: 3,
      alto: 4
    }, {
      concepto: 5,
      bajo: 1,
      medio: 3,
      alto: 4
    },{
      concepto: 8,
      bajo: 1,
      medio: 3,
      alto: 4
    }],
    vendedoresDesde: [{
      concepto: 0,
      bajo: 1,
      medio: 3,
      alto: 4
    }, {
      concepto: 5,
      bajo: 1,
      medio: 3,
      alto: 4
    },{
      concepto: 8,
      bajo: 1,
      medio: 3,
      alto: 4
    }],
    publicidadDesde: [{
      concepto: 0,
      bajo: 1,
      medio: 3,
      alto: 4
    }, {
      concepto: 5,
      bajo: 1,
      medio: 3,
      alto: 4
    },{
      concepto: 8,
      bajo: 1,
      medio: 3,
      alto: 4
    }],
    empresasCompetidoras: [{
      concepto: "Empresa A",
      bajo: 1,
      medio: 3,
      alto: 4
    }, {
      concepto: "Empresa B",
      bajo: 1,
      medio: 3,
      alto: 4
    },{
      concepto: "Empresa C",
      bajo: 1,
      medio: 3,
      alto: 4
    }]
  }

  forecasts = [{
    periodo: 1,
    bajo: 1,
    medio: 3,
    alto: 4
  }, {
    periodo: 1,
    bajo: 1,
    medio: 3,
    alto: 4
  }, {
    periodo: 1,
    bajo: 1,
    medio: 3,
    alto: 4 
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
    this.escenariosService.getDetalleEscenarioUsuariosPorCurso(escenarioId, cursoId).subscribe(jugadores => this.jugadores = jugadores)
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
