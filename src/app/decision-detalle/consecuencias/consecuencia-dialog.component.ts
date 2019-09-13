import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { tiposCuenta,tiposFlujoFondo } from '../valores-dominio';

@Component({
  selector: 'consecuencia-dialog',
  templateUrl: './consecuencia-dialog.component.html',
  styleUrls: ['./consecuencia-dialog.component.css']
})
export class ConsecuenciaDialogComponent implements OnInit {
  tiposCuenta;
  tiposFlujoFondo;
  consecuencia = {
    opcionId: null,
    descripcion: "",
    monto: null,
    periodoInicio: 0,
    cantidadPeriodos: 1,
    tipoCuenta: "ECONOMICO"
  };
  descripcion = new FormControl('', [Validators.required])
  monto = new FormControl('', [Validators.required])
  periodoInicio = new FormControl('', [Validators.required])
  cantidadPeriodos = new FormControl('', [Validators.required])
  tipoCuenta = new FormControl('', [Validators.required])
  tipoFlujoFondo = new FormControl('', [Validators.required])
  consecuenciaForm: FormGroup = new FormGroup({
    descripcion: this.descripcion,
    monto: this.monto,
    periodoInicio: this.periodoInicio,
    cantidadPeriodos: this.cantidadPeriodos,
    tipoCuenta: this.tipoCuenta,
    tipoFlujoFondo: this.tipoFlujoFondo
  });

  constructor( public dialogRef: MatDialogRef<ConsecuenciaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.tiposCuenta = tiposCuenta;
    this.tiposFlujoFondo = tiposFlujoFondo;
    if(this.data.id){
      this.consecuencia = JSON.parse(JSON.stringify(this.data));
    }else{
      this.consecuencia.opcionId = this.data.opcionId;
    }
  }

}
