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
  }

  getCurso(cursoId){
    this.cursosService.getCurso(cursoId).subscribe(curso => this.curso = curso)
  }

  getEscenario(escenarioId){
    this.escenariosService.getEscenario(escenarioId).subscribe(escenario => this.escenario = escenario)
  }


}
