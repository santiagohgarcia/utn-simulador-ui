import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  @ViewChild('sidenav',{
    static: true
  }) sidenav: MatSidenav;

  user: any;
  usuario;

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.user = user;
        this.usuarioService.getUsuario(user.email).subscribe(usuario => this.usuario = usuario)
      }else {
        // User is not logged in
        this.router.navigateByUrl("/login");
      }
    });
  }

  close() {
    this.sidenav.close();
  }

  logout() {
    this.afAuth.auth.signOut();
  }


}

