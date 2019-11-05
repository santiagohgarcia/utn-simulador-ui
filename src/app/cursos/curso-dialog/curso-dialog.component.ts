import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { MessagesService } from '../../messages.service';
import { Router } from '@angular/router';
import { CursosService } from '../../cursos.service';

@Component({
  selector: 'curso-dialog',
  templateUrl: './curso-dialog.component.html',
  styleUrls: ['./curso-dialog.component.css']
})
export class CursoDialogComponent implements OnInit {
  curso;
  nombre = new FormControl('', [Validators.required])
  clave = new FormControl('', [Validators.required])
  cursoForm: FormGroup = new FormGroup({
    nombre: this.nombre,
    clave: this.clave
  });

  constructor( public dialogRef: MatDialogRef<CursoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private cursosService: CursosService, 
    private messageService: MessagesService) { }

  ngOnInit() {
      this.curso = JSON.parse(JSON.stringify(this.data));
  }

  cancel(){
      this.dialogRef.close();
  }

  save() {
    if (this.cursoForm.valid) {
      let cursoSend = {id: this.curso.id, nombre: this.curso.nombre, clave: btoa(this.curso.clave)};
      this.cursosService[this.curso.id ? 'modifyCurso' : 'createCurso'](cursoSend)
        .subscribe(_ => {
          this.messageService.openSnackBar("Curso modificado");
          this.dialogRef.close();
        })
    }else {
      this.messageService.openSnackBarDatosIngresados()
    }
  }

}
