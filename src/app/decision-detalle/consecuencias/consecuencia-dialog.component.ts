import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { tiposCuenta, tiposFlujoFondo } from '../valores-dominio';

@Component({
  selector: 'consecuencia-dialog',
  templateUrl: './consecuencia-dialog.component.html',
  styleUrls: ['./consecuencia-dialog.component.css']
})
export class ConsecuenciaDialogComponent implements OnInit {
  tiposCuenta;
  tiposFlujoFondo;
  consecuencia;
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

  constructor(public dialogRef: MatDialogRef<ConsecuenciaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.tiposCuenta = tiposCuenta;
    this.tiposFlujoFondo = tiposFlujoFondo;
    this.consecuencia = JSON.parse(JSON.stringify(this.data));
  }

  cancel(){
      this.dialogRef.close();
  }

  save(){
    if(this.consecuenciaForm.valid){
      this.dialogRef.close(this.consecuencia);
    }
  }

}
