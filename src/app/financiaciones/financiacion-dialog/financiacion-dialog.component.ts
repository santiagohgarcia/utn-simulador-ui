import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { MessagesService } from '../../messages.service';
import { Router } from '@angular/router';
import { FinanciacionService } from '../../financiacion.service';

@Component({
  selector: 'financiacion-dialog',
  templateUrl: './financiacion-dialog.component.html',
  styleUrls: ['./financiacion-dialog.component.css']
})
export class FinanciacionDialogComponent implements OnInit {
  financiacion;
  descripcion = new FormControl('', [Validators.required])
  tea = new FormControl('', [Validators.required, Validators.min(1), Validators.max(100)])
  cantidadCuotas = new FormControl('', [Validators.required])
  financiacionForm: FormGroup = new FormGroup({
    descripcion: this.descripcion,
    cantidadCuotas: this.cantidadCuotas,
    tea: this.tea
  });

  constructor( public dialogRef: MatDialogRef<FinanciacionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private financiacionService: FinanciacionService, 
    private messageService: MessagesService, private router: Router) { }

  ngOnInit() {
      this.financiacion = JSON.parse(JSON.stringify(this.data));
  }

  cancel(){
      this.dialogRef.close();
  }

  save() {
    if (this.financiacionForm.valid) {
      this.financiacionService[this.financiacion.id ? 'modifyFinanciacion' : 'createFinanciacion'](this.financiacion)
        .subscribe(_ => {
          this.messageService.openSnackBar("Financiacion modificada");
          this.dialogRef.close();
        })
    }
  }

}
