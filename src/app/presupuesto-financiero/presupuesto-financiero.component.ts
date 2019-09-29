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

  getCuentaPeriodo(cuentasPeriodo,periodo,defaultCero = true, signoInvertido = false){
    var periodo = cuentasPeriodo && cuentasPeriodo.find(cuentaPeriodo => cuentaPeriodo.periodo === periodo )
    var montoCrudo = periodo ? periodo.monto : ( defaultCero ? 0 : ""  );
    montoCrudo = signoInvertido ? -montoCrudo : montoCrudo;
    if(montoCrudo < 0 ){
      return "(" + Math.abs(montoCrudo) + ")";
    } else {
      return montoCrudo;
    }
  }

}
