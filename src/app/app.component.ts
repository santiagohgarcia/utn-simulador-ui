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
   
  }

}
