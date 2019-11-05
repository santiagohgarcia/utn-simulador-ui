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
  cajaChartProps;
  rentaChartProps;
  escenarioCurso;
  puntajes;

  constructor(private route: ActivatedRoute, private cursosService: CursosService,
    private escenariosService: EscenariosService,
    private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.getCurso(this.usuarioService.usuario.cursoId);
    this.getDetalleEscenarioUsuariosPorCurso(this.escenario.id, this.curso.id);
    this.getPuntajes(this.escenario.id)
  }

  getCurso(cursoId) {
    this.cursosService.getCurso(cursoId).subscribe(curso => this.curso = curso)
  }

  getDetalleEscenarioUsuariosPorCurso(escenarioId, cursoId) {
    this.escenariosService.getDetalleEscenarioUsuariosPorCurso(escenarioId, cursoId).subscribe(escenarioCurso => {
      this.escenarioCurso = escenarioCurso;
      this.setVentasChartProps(escenarioCurso.jugadores);
      this.setCajaChartProps(escenarioCurso.jugadores);
      this.setRentaChartProps(escenarioCurso.jugadores);
    })
  }

  getPuntajes(escenarioId) {
    this.escenariosService.getPuntajes(escenarioId).subscribe(puntajes => {
      if (puntajes) {
        this.puntajes = puntajes;
      }
    })
  }

  setVentasChartProps(jugadores) {
    var jugadoresPorVentas = jugadores.concat([]);
    jugadoresPorVentas.sort((j1, j2) => j1.ventas < j2.ventas);
    this.ventasChartProps = {
      options: {
        scaleShowVerticalLines: false,
        responsive: true,
        aspectRatio: 3
      },
      labels: jugadoresPorVentas.map(j => j.usuarioNombre),
      type: 'horizontalBar',
      legend: false,
      data: [
        {
          data: jugadoresPorVentas.map(j => j.ventasTotales),
          label: 'Ventas'
        }
      ]
    }
  }


  setCajaChartProps(jugadores) {
    var jugadoresPorCaja = jugadores.concat([]);
    jugadoresPorCaja.sort((j1, j2) => j1.cajaFinal < j2.cajaFinal);
    this.cajaChartProps = {
      options: {
        scaleShowVerticalLines: false,
        responsive: true,
        aspectRatio: 3
      },
      labels: jugadoresPorCaja.map(j => j.usuarioNombre),
      type: 'horizontalBar',
      legend: false,
      data: [
        {
          data: jugadoresPorCaja.map(j => j.cajaFinal),
          label: 'Ventas'
        }
      ]
    }
  }


  setRentaChartProps(jugadores) {
    var jugadoresPorRenta = jugadores.concat([]);
    jugadoresPorRenta.sort((j1, j2) => j1.renta < j2.renta);
    this.rentaChartProps = {
      options: {
        scaleShowVerticalLines: false,
        responsive: true,
        aspectRatio: 3
      },
      labels: jugadoresPorRenta.map(j => j.usuarioNombre),
      type: 'horizontalBar',
      legend: false,
      data: [
        {
          data: jugadoresPorRenta.map(j => j.renta),
          label: 'Ventas'
        }
      ]
    }
  }

  getMedalUrlByIndex(index) {
    switch (index) {
      case 0: return "../../assets/img/gold-medal.png";
      case 1: return "../../assets/img/silver-medal.png";
      case 2: return "../../assets/img/bronze-medal.png";
      default: return "../../assets/img/medal.png";
    }
  }

}
