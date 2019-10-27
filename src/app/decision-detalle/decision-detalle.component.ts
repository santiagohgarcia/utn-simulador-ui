import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material';
import { OpcionDialogComponent } from './opciones/opcion-dialog.component';
import { DecisionesService } from '../decisiones.service';
import { ConsecuenciaDialogComponent } from './consecuencias/consecuencia-dialog.component';
import { MessagesService } from '../messages.service';
import { EscenariosService } from '../escenarios.service';
import { ProyectoService } from '../proyecto.service';

@Component({
  selector: 'app-decision-detalle',
  templateUrl: './decision-detalle.component.html',
  styleUrls: ['./decision-detalle.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class DecisionDetalleComponent implements OnInit {
  tipoCuentas;
  decision: any = {
    escenarioId: null,
    descripcion: "",
    opciones: []
  };

  descripcion = new FormControl('', [Validators.required]);
  decisionForm: FormGroup = new FormGroup({
    descripcion: this.descripcion
  });

  displayedColumns: string[] = ['descripcion', 'edit'];

  constructor(private decisionesService: DecisionesService, 
    private route: ActivatedRoute, 
    private dialog: MatDialog,
    private router: Router,
    private messageService: MessagesService,
    private escenariosService: EscenariosService,
    private proyectoService: ProyectoService) { }

  ngOnInit() {
    var esenarioId = Number(this.route.snapshot.paramMap.get('escenarioId'));
    var id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.escenariosService.getDecision(esenarioId, id).subscribe(d => {
        this.decision = d;
        this.decision.escenarioId = esenarioId;
      });
    } else {
      this.decision.escenarioId = esenarioId;
    }
    this.getTipoCuentas();
  }

  getTipoCuentas(){
      this.proyectoService.getTipoCuentas().subscribe(tipoCuentas => this.tipoCuentas = tipoCuentas)
  }

  tipoCuentaDescripcion(tipoCuenta){
    const tipoCuentaObject = this.tipoCuentas.find(tc => tc.key === tipoCuenta)
    return tipoCuentaObject && tipoCuentaObject.descripcion;
  }

  addOpcion() {
    const dialogRef = this.dialog.open(OpcionDialogComponent, {
      width: '400px',
      data: {
        decisionId: this.decision.id,
        descripcion: "",
        variacionCostoFijo: 0,
        variacionCostoVariable: 0,
        variacionProduccion: 0, 
        variacionCalidad: 0,
        variacionPublicidad: 0,
        consecuencias: []
      }
    });
    var that = this;
    dialogRef.afterClosed().subscribe(updatedOpcion => {
      if (updatedOpcion) {
        that.decision.opciones.push(updatedOpcion);
        that.refreshDecisiones();
      }
    });
  }

  editOpcion(opcion) {
    const dialogRef = this.dialog.open(OpcionDialogComponent, {
      width: '400px',
      data: opcion
    });
    var that = this;
    dialogRef.afterClosed().subscribe(updatedOpcion => {
      if (updatedOpcion) {
        var index = that.decision.opciones.indexOf(opcion);
        if (index !== -1) {
          that.decision.opciones[index] = updatedOpcion;
        }
        that.refreshDecisiones();
      }
    });
  }

  removeOpcion(opcion) {
    var index = this.decision.opciones.indexOf(opcion);
    this.decision.opciones.splice(index, 1)
    this.refreshDecisiones();
  }

  addConsecuencia(opcion) {
    const dialogRef = this.dialog.open(ConsecuenciaDialogComponent, {
      width: '400px',
      data: {
        opcionId: opcion.id,
        descripcion: "",
        monto: null,
        periodoInicio: 0,
        cantidadPeriodos: 1,
        tipoCuenta: "ECONOMICO"
      }
    });
    dialogRef.afterClosed().subscribe(updatedConsecuencia => {
      if (updatedConsecuencia) {
        opcion.consecuencias.push(updatedConsecuencia);
        this.refreshConsecuencias(opcion);
      }
    });
  }

  editConsecuencia(opcion, consecuencia) {
    const dialogRef = this.dialog.open(ConsecuenciaDialogComponent, {
      width: '400px',
      data: consecuencia
    });

    dialogRef.afterClosed().subscribe(updatedConsecuencia => {
      if (updatedConsecuencia) {
        var index = opcion.consecuencias.indexOf(consecuencia);
        if (index !== -1) {
          opcion.consecuencias[index] = updatedConsecuencia;
        }
        this.refreshConsecuencias(opcion);
      }
    });
  }

  removeConsecuencia(opcion, consecuencia) {
    var index = opcion.consecuencias.indexOf(consecuencia);
    opcion.consecuencias.splice(index, 1);
    this.refreshConsecuencias(opcion);
  }

  refreshDecisiones() {
    this.decision.opciones = this.decision.opciones.slice(0);
  }

  refreshConsecuencias(opcion) {
    opcion.consecuencias = opcion.consecuencias.slice(0);
  }

  save() {
    if (this.decisionForm.valid) {
      this.decisionesService[this.decision.id ? 'modifyDecision' : 'createDecision'](this.decision)
        .subscribe(_ => {
          this.messageService.openSnackBar("Decision modificada");
          this.router.navigate([`/escenarios/${this.decision.escenarioId}`])
        })
    }
  }

}
