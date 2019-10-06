import { Component, OnInit, Input } from '@angular/core';
import { EscenariosService } from '../escenarios.service';
import { FinanciacionService } from '../financiacion.service';
import { MatDialog } from '@angular/material';
import { FinanciacionDialogComponent } from './financiacion-dialog/financiacion-dialog.component';

@Component({
  selector: 'app-financiaciones',
  templateUrl: './financiaciones.component.html',
  styleUrls: ['./financiaciones.component.css']
})
export class FinanciacionesComponent implements OnInit {
  @Input() escenario: any;
  financiaciones;
  constructor(private dialog: MatDialog,
    private escenarioService: EscenariosService,
    private financiacionService: FinanciacionService) { }

  ngOnInit() {
    this.getFinanciaciones();
  }

  getFinanciaciones() {
    this.escenarioService.getFinanciaciones(this.escenario.id).subscribe(financiaciones => this.financiaciones = financiaciones);
  }

  editFinanciacion(financiacion) {
    const dialogRef = this.dialog.open(FinanciacionDialogComponent, {
      width: '400px',
      data: financiacion
    });
    dialogRef.afterClosed().subscribe(_ => this.getFinanciaciones());
  }

  removeFinanciacion(financiacion) {
    this.financiacionService.removeFinanciacion(financiacion).subscribe(_ => this.getFinanciaciones())
  }

  createFinanciacion(){
    const dialogRef = this.dialog.open(FinanciacionDialogComponent, {
      width: '400px',
      data: {
        escenarioId: this.escenario.id,
        descripcion:"",
        tna: 0,
        cantidadCuotas: 0
      }
    });
    dialogRef.afterClosed().subscribe(_ => this.getFinanciaciones());
  }

}
