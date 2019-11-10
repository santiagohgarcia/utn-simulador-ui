import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../proyecto.service';
import { EscenariosService } from '../escenarios.service';
import { UsuarioService } from '../usuario.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-escenarios',
  templateUrl: './escenarios.component.html',
  styleUrls: ['./escenarios.component.css']
})
export class EscenariosComponent implements OnInit {
  usuario;
  escenarios: Array<any>;

  constructor(private escenariosService: EscenariosService, private usuarioService: UsuarioService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
    this.getEscenarios();
  }

  getEscenarios() {
    this.escenariosService.getEscenarios().subscribe(escenarios => this.escenarios = escenarios)
  }

  deleteEscenario(id) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        message: "Seguro que desea eliminar el escenario?"
      }
    });
    dialogRef.afterClosed().subscribe(response => {
      if (response === "OK") {
        this.escenariosService.deleteEscenario(id).subscribe(_ => this.getEscenarios())
      }
    });
  }

  duplicateEscenario(escenario) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        message: "Seguro que desea clonar el escenario?"
      }
    });
    dialogRef.afterClosed().subscribe(response => {
      if (response === "OK") {
        this.escenariosService.duplicateEscenario(escenario).subscribe(_ => this.getEscenarios())
      }
    });
  }

}
