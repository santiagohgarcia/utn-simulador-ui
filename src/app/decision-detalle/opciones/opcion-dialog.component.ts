import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MessagesService } from '../../messages.service';

@Component({
  selector: 'opcion-dialog',
  templateUrl: './opcion-dialog.component.html',
  styleUrls: ['./opcion-dialog.component.css']
})
export class OpcionDialogComponent implements OnInit {
  opcion;
  descripcion = new FormControl('', [Validators.required])
  variacionCostoFijo = new FormControl('', [Validators.required])
  variacionCostoVariable = new FormControl('', [Validators.required])
  variacionProduccion = new FormControl('', [Validators.required])
  variacionCalidad = new FormControl('', [Validators.required])
  variacionPublicidad = new FormControl('', [Validators.required])
  opcionForm: FormGroup = new FormGroup({
    descripcion: this.descripcion,
    variacionCostoFijo: this.variacionCostoFijo,
    variacionCostoVariable: this.variacionCostoVariable,
    variacionProduccion: this.variacionProduccion,
    variacionCalidad: this.variacionCalidad,
    variacionPublicidad: this.variacionPublicidad
  });

  constructor( public dialogRef: MatDialogRef<OpcionDialogComponent>,
    private messageService: MessagesService,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
      this.opcion = JSON.parse(JSON.stringify(this.data));
  }

  cancel(){
      this.dialogRef.close();
  }

  save(){
    if(this.opcionForm.valid){
      this.dialogRef.close(this.opcion);
    }else {
      this.messageService.openSnackBarDatosIngresados()
    }
  }

}
