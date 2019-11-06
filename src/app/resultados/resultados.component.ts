import { Component, OnInit, Inject } from '@angular/core';
import { EscenariosService } from '../escenarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { ProyectoService } from '../proyecto.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {
  proyecto;
  escenario;
  decisiones;
  escenarioCurso;
  forecast;
  seccion = "RESULTADOS_FORECAST";

  constructor(private escenarioService: EscenariosService, private route: ActivatedRoute,
    private usuarioService: UsuarioService, private proyectoService: ProyectoService, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    var escenarioId = Number(this.route.snapshot.paramMap.get('escenarioId'));
    this.getEscenario(escenarioId);
    this.getProyecto(escenarioId, this.usuarioService.usuario.id);
    this.getDetalleEscenarioUsuariosPorCurso(escenarioId, this.usuarioService.usuario.curso.id);
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

  entregarSimulacion() {
    const dialogRef = this.dialog.open(EntregarConfirmationPopup, {
      width: window.screen.width > 768 ? '50%' : '95%'
    });

    dialogRef.afterClosed().subscribe(respuesta => {
      if (respuesta === "ENTREGAR") {
        this.proyectoService.entregarProyecto(this.proyecto.id)
          .subscribe( _ =>  this.router.navigate(['/simulacion-entregada']) ); 
      }
    });
  }
}

@Component({
  selector: 'entregar-confirmation-popup',
  templateUrl: 'entregar-confirmation-popup.html',
})
export class EntregarConfirmationPopup {

  constructor(
    public dialogRef: MatDialogRef<EntregarConfirmationPopup>) { }

  onEntregarClick(): void {
    this.dialogRef.close('ENTREGAR');
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
