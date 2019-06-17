import { Component, OnInit } from '@angular/core';
import { ProyectService } from "../proyect.service";
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-simulations',
  templateUrl: './simulations.component.html',
  styleUrls: ['./simulations.component.css']
})
export class SimulationsComponent implements OnInit {

  proyectStatus$: Observable<any>;

  constructor(private proyectService: ProyectService) { }

  ngOnInit() {
    this.proyectStatus$ = this.proyectService.getStatus();
  }

}
