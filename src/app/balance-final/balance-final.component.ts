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
  totalActivo = 0;
  totalPasivoPatrimonioNeto = 0;

  constructor(private proyectoService: ProyectoService) { }

  ngOnInit() {
    this.getBalanceFinal(this.proyecto.id);
  }

  getBalanceFinal(idProyecto){
    this.proyectoService.getBalanceFinal(idProyecto,this.forecast).subscribe(balanceFinal => {this.balanceFinal = balanceFinal; this.getTotalActivo(); this.getTotalPasivoPatrimonioNeto()});
  }

  getTotalActivo() {
    this.totalActivo = this.balanceFinal.activo.caja + this.balanceFinal.activo.cuentasPorCobrar + this.balanceFinal.activo.inventario + this.balanceFinal.activo.maquinaria + this.balanceFinal.activo.amortizacionAcumulada;
  }

  getTotalPasivoPatrimonioNeto() {
    this.totalPasivoPatrimonioNeto = this.balanceFinal.pasivo.proveedores + this.balanceFinal.pasivo.deudasBancarias + this.balanceFinal.patrimonioNeto.capitalSocial + this.balanceFinal.patrimonioNeto.resultadoDelEjercicio;
  }

}
