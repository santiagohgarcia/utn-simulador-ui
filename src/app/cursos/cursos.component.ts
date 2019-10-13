import { Component, OnInit } from '@angular/core';
import { CursosService } from '../cursos.service';
import { CursoDialogComponent } from './curso-dialog/curso-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  cursos;

  constructor(private cursosService: CursosService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getCursos();
  }

  getCursos() {
    this.cursosService.getCursos().subscribe(cursos => this.cursos = cursos);
  }

  editCurso(curso) {
    const dialogRef = this.dialog.open(CursoDialogComponent, {
      width: '400px',
      data: curso
    });
    dialogRef.afterClosed().subscribe(_ => this.getCursos());
  }

  removeCurso(curso) {
    this.cursosService.removeCurso(curso).subscribe(_ => this.getCursos())
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
