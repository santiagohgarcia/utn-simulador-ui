import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../proyecto.service';

@Component({
  selector: 'app-presupuesto-financiero',
  templateUrl: './presupuesto-financiero.component.html',
  styleUrls: ['./presupuesto-financiero.component.css']
})
export class PresupuestoFinancieroComponent implements OnInit {

  presupuestoFinanciero;
  periodos;

  constructor(private proyectoService: ProyectoService) { }

  ngOnInit() {
    this.getPeriodos();
    this.getPresupuestoFinanciero();
  }

  getPresupuestoFinanciero() {
    this.proyectoService.getPresupuestoFinanciero(1).subscribe( pf => {
      this.presupuestoFinanciero = pf;
    })
  }

  getPeriodos(){
    this.proyectoService.getPeriodoActual(1).subscribe(periodoActual => {
          this.periodos = [...Array(periodoActual).keys(),periodoActual];
    })
  }

  getCuentaPeriodo(cuentasPeriodo,periodo,defaultCero = true){
    var periodo = cuentasPeriodo && cuentasPeriodo.find(cuentaPeriodo => cuentaPeriodo.periodo === periodo )
    return periodo ? periodo.monto : ( defaultCero ? 0 : ""  );
  }

}
