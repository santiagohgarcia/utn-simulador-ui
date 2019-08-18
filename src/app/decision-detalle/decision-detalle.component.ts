import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { ProyectoService } from '../proyecto.service';
import { ActivatedRoute } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material';
import { OpcionDialogComponent } from './opciones/opcion-dialog.component';

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

  decision;

  templateDecision = {
    descripcion: "",
    opciones: []
  };

  saveFunction;

  descripcion = new FormControl('', [Validators.required]);
  decisionForm: FormGroup = new FormGroup({
    descripcion: this.descripcion
  });

  displayedColumns: string[] = ['descripcion', 'edit'];

  constructor(private proyectoService: ProyectoService, private route: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit() {
    var id = Number(this.route.snapshot.paramMap.get('id'));
    this.getDecision(id).subscribe(d => this.decision = d);
  }

  getDecision(id) {
    return id ? this.proyectoService.getDecision(id) : of(this.templateDecision);
  }

  addOpcion() {
    this.decision.opciones = this.decision.opciones.concat([{
      descripcion: "nueva resp",
      consecuencias: []
    }]);
  }

  removeOpcion(opcion) {
    var index = this.decision.opciones.indexOf(opcion);
    this.decision.opciones.splice(index, 1)
    this.decision.opciones = this.decision.opciones.concat([]);
  }

  editOpcion(opcion) {
    this.dialog.open(OpcionDialogComponent, {
      width: '250px',
      data: opcion
    });
  }

  addConsecuencia(opcion) {
    opcion.consecuencias = opcion.consecuencias.concat([{
      cuenta: "cuenta",
      valor: 10
    }])
  }

  removeConsecuencia(opcion, consecuencia) {
    var index = opcion.consecuencias.indexOf(consecuencia);
    opcion.consecuencias.splice(index, 1);
    opcion.consecuencias = opcion.consecuencias.concat([]);
  }

}
