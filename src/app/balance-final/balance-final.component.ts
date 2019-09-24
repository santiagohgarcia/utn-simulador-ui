import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../proyecto.service';

@Component({
  selector: 'app-balance-final',
  templateUrl: './balance-final.component.html',
  styleUrls: ['./balance-final.component.css']
})
export class BalanceFinalComponent implements OnInit {

  balanceFinal;

  constructor(private proyectoService: ProyectoService) { }

  ngOnInit() {
    this.getBalanceFinal(1);
  }

  getBalanceFinal(idProyecto){
    this.proyectoService.getBalanceFinal(idProyecto).subscribe(balanceFinal => this.balanceFinal = balanceFinal);
  }

}
