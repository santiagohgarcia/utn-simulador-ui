import {Component, ViewChild, OnInit} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  usuario;

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private usuarioService: UsuarioService){ }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.usuarioService.getUsuario(user.email).subscribe(usuario => this.usuario = usuario)
      }else {
        // User is not logged in
        this.router.navigateByUrl("/login");
      }
    });
  }

}
