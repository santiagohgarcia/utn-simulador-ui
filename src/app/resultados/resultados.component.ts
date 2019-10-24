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

  constructor(private escenarioService: EscenariosService, private route: ActivatedRoute,
    private usuarioService: UsuarioService, private proyectoService: ProyectoService, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    var escenarioId = Number(this.route.snapshot.paramMap.get('escenarioId'));
    this.getEscenario(escenarioId);
    this.getProyecto(escenarioId, this.usuarioService.usuario.id);
  }

  getProyecto(escenarioId, usuarioId) {
    this.usuarioService.getProyecto(escenarioId, usuarioId).subscribe(estado => {
      this.proyecto = estado.proyecto;
    })
  }

  getEscenario(escenarioId) {
    this.escenarioService.getEscenario(escenarioId).subscribe(escenario => this.escenario = escenario);
  }

  entregarSimulacion() {
    const dialogRef = this.dialog.open(EntregarConfirmationPopup, {
      width: window.screen.width > 768 ? '50%' : '95%'
    });

    dialogRef.afterClosed().subscribe(respuesta => {
      if (respuesta === "ENTREGAR") {
        respuesta = this.proyectoService.entregarProyecto(this.proyecto.id); //TODO_SANTI: Por algun motivo no se me ejecuta la llamada (no la veo en Network)
        if (respuesta && respuesta.entregado){ 
          this.router.navigate(['/simulacion-entregada']);
        } else {
          //TODO_SANTI: Mostrar mensaje de No se pudo entregar
        }
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
