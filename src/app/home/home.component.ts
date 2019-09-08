import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

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

  constructor(private router: Router,
              private afAuth: AngularFireAuth) { }

  ngOnInit() {
      this.afAuth.user.subscribe(user => this.user = user);
  }

  close() {
    this.sidenav.close();
  }

  logout() {
    this.afAuth.auth.signOut();
  }


}

