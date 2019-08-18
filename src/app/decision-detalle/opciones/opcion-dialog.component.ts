import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FormControl, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'opcion-dialog',
  templateUrl: './opcion-dialog.component.html',
  styleUrls: ['./opcion-dialog.component.css']
})
export class OpcionDialogComponent implements OnInit {

  descripcion = new FormControl('', [Validators.required])
  opcionForm: FormGroup = new FormGroup({
    descripcion: this.descripcion,
  });

  constructor(public dialogRef: MatDialogRef<OpcionDialogComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit() {

  }

  onSave() {
    
  }

  onClose() {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string = "OK") {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

}
