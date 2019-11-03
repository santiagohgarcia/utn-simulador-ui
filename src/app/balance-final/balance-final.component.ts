import { Component, OnInit, Input } from '@angular/core';
import { ProyectoService } from '../proyecto.service';

@Component({
  selector: 'app-balance-final',
  templateUrl: './balance-final.component.html',
  styleUrls: ['./balance-final.component.css']
})
export class BalanceFinalComponent implements OnInit {
  @Input() proyecto: any;
  @Input() forecast: boolean;
  balanceFinal;

  constructor(private proyectoService: ProyectoService) { }

  ngOnInit() {
    this.getBalanceFinal(this.proyecto.id);
  }

  getBalanceFinal(idProyecto){
    this.proyectoService.getBalanceFinal(idProyecto,this.forecast).subscribe(balanceFinal => this.balanceFinal = balanceFinal);
  }

}
