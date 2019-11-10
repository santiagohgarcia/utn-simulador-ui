import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UsuarioService } from '../usuario.service';
import { MatriculacionDialogComponent } from '../matriculacion-dialog/matriculacion-dialog.component';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  @ViewChild('sidenav', {
    static: true
  }) sidenav: MatSidenav;

  user: any;
  usuario;
  opened = true;
  pendingRequests;
  mobileQuery: MediaQueryList;

  constructor(private router: Router,
    private afAuth: AngularFireAuth,
    private usuarioService: UsuarioService,
    private dialog: MatDialog,
    private media: MediaMatcher) {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        this.getUsuario({
          mail: user.email,
          nombreCompleto: user.displayName || user.email,
          fotoUrl: user.photoURL
        });
      } else {
        // User is not logged in
        this.router.navigateByUrl("/login");
      }
    });


  }

  getUsuario(mail) {
    this.usuarioService.getUsuario(mail).subscribe(usuario => {
      this.usuario = usuario
      if (!usuario.curso && usuario.rol === "JUGADOR") {
        this.matricularUsuario(usuario);
      }
    }
    )
  }

  matricularUsuario(usuario) {
    const dialogRef = this.dialog.open(MatriculacionDialogComponent, {
      width: '400px',
      data: usuario,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(_ => {
      this.router.navigateByUrl('/simulaciones', { skipLocationChange: true })
      this.getUsuario(usuario)
    });
  }

  close() {
    this.sidenav.close();
  }

  logout() {
    this.afAuth.auth.signOut();
  }


}

