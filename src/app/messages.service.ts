import { Injectable, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
 
export class MessagesService {


  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message) {
    this._snackBar.open(message, "OK", {
      duration: 2000, 
    });
  }

  catchError(err) {
    this.openSnackBar(err.error? err.error.message : "Error desconocido");
    return throwError(err);
  }

  openSnackBarDatosIngresados(){
    this._snackBar.open("Revise los datos ingresados", "OK", {
      duration: 2000, 
    });
  }




}
