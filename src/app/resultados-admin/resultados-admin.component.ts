import { Component, OnInit, Inject } from '@angular/core';
import { EscenariosService } from '../escenarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { ProyectoService } from '../proyecto.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados-admin.component.html',
  styleUrls: ['./resultados-admin.component.css']
})
export class ResultadosAdminComponent implements OnInit {
  proyecto;
  escenario;
  decisiones;
  escenarioCurso;
  forecast;
  seccion = "RESULTADOS_FORECAST";
  cursoId;
  usuarioId;

  constructor(private escenarioService: EscenariosService, private route: ActivatedRoute,
    private usuarioService: UsuarioService, private proyectoService: ProyectoService, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    var escenarioId = Number(this.route.snapshot.paramMap.get('escenarioId'));
    this.cursoId = Number(this.route.snapshot.paramMap.get('cursoId'));
    this.usuarioId = Number(this.route.snapshot.paramMap.get('usuarioId'));
    this.getEscenario(escenarioId);
    this.getProyecto(escenarioId, this.usuarioId);
    this.getDetalleEscenarioUsuariosPorCurso(escenarioId, this.cursoId);
  }

  getDetalleEscenarioUsuariosPorCurso(escenarioId, cursoId) {
    this.escenarioService.getDetalleEscenarioUsuariosPorCurso(escenarioId, cursoId).subscribe(escenarioCurso => {
      this.escenarioCurso = escenarioCurso;
    })
  }

  getProyecto(escenarioId, usuarioId) {
    this.usuarioService.getProyecto(escenarioId, usuarioId).subscribe(estado => {
      this.proyecto = estado.proyecto;
      this.getDecisiones(this.proyecto.id);
      this.getForecast(this.proyecto.id);
    })
  }

  getDecisiones(proyectoId) {
    this.proyectoService.getDecisiones(proyectoId)
      .subscribe(decisiones => this.decisiones = decisiones);
  }

  getEscenario(escenarioId) {
    this.escenarioService.getEscenario(escenarioId).subscribe(escenario => this.escenario = escenario);
  }

  getForecast(proyectoId) {
    this.proyectoService.getForecast(proyectoId).subscribe(forecast => {this.forecast = forecast;
    if(forecast.length <= 0) this.seccion = "RESULTADOS_REALES"});
  }
}
