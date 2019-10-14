import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { MessagesService } from '../messages.service';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'matriculacion-dialog',
  templateUrl: './matriculacion-dialog.component.html',
  styleUrls: ['./matriculacion-dialog.component.css']
})
export class MatriculacionDialogComponent implements OnInit {
  curso;
  usuario;
  nombre = new FormControl('', [Validators.required])
  clave = new FormControl('', [Validators.required])
  cursoForm: FormGroup = new FormGroup({
    nombre: this.nombre,
    clave: this.clave
  });

  constructor(public dialogRef: MatDialogRef<MatriculacionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private usuarioService: UsuarioService,
    private messageService: MessagesService) { }

  ngOnInit() {
    this.usuario = JSON.parse(JSON.stringify(this.data));
    this.curso = {
      nombre: "",
      clave: ""
    };
  }

  cancel() {
    this.dialogRef.close();
  }

  matricular() {
    if (this.cursoForm.valid) {
      this.usuarioService.matricular(this.usuario, this.curso).subscribe(_ => {
        
        this.dialogRef.close()
      });
    }
  }

}
