import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'opcion-dialog',
  templateUrl: './opcion-dialog.component.html',
  styleUrls: ['./opcion-dialog.component.css']
})
export class OpcionDialogComponent implements OnInit {
  opcion;
  descripcion = new FormControl('', [Validators.required])
  opcionForm: FormGroup = new FormGroup({
    descripcion: this.descripcion,
  });

  constructor( public dialogRef: MatDialogRef<OpcionDialogComponent>,
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
    }
  }

}
