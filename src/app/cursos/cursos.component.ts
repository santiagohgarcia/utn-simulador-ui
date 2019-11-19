import { Component, OnInit } from '@angular/core';
import { CursosService } from '../cursos.service';
import { CursoDialogComponent } from './curso-dialog/curso-dialog.component';
import { MatDialog } from '@angular/material';
import { UsuarioService } from '../usuario.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  cursos;
  usuario;

  constructor(private cursosService: CursosService, private dialog: MatDialog, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.getCursos();
    this.usuario = this.usuarioService.usuario;
  }

  getCursos() {
    this.cursosService.getCursos().subscribe(cursos => this.cursos = cursos.map(
      c => {
        const curso={
          id: c.id,
          nombre: c.nombre,
          clave: atob(c.clave)
        };
        return curso;
      }
    ));
  }

  decodeBase64() {

  }

  editCurso(curso) {
    const dialogRef = this.dialog.open(CursoDialogComponent, {
      width: '400px',
      data: curso
    });
    dialogRef.afterClosed().subscribe(_ => this.getCursos());
  }

  removeCurso(curso) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        message: "Seguro que desea eliminar el curso?"
      }
    });
    dialogRef.afterClosed().subscribe(response => {
      if (response === "OK") {
        this.cursosService.removeCurso(curso).subscribe(_ => this.getCursos())
      }
    });
  }

  createCurso() {
    const dialogRef = this.dialog.open(CursoDialogComponent, {
      width: '400px',
      data: {
        nombre: "",
        clave: ""
      }
    });
    dialogRef.afterClosed().subscribe(_ => this.getCursos());
  }

}
