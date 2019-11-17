import { Component, OnInit, Input } from '@angular/core';
import { ProyectoService } from '../proyecto.service';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-presupuesto-financiero',
  templateUrl: './presupuesto-financiero.component.html',
  styleUrls: ['./presupuesto-financiero.component.css']
})
export class PresupuestoFinancieroComponent implements OnInit {
  @Input() proyecto: any;
  @Input() forecast: boolean;
  presupuestoFinanciero;
  periodos;
  escenario;

  constructor(private proyectoService: ProyectoService) { }

  ngOnInit() {
    this.getPeriodos(this.proyecto.id);
    this.getPresupuestoFinanciero(this.proyecto.id);
    this.escenario = this.proyecto.escenario;
  }

  getPresupuestoFinanciero(proyectoId) {
    this.proyectoService.getPresupuestoFinanciero(proyectoId,this.forecast).subscribe(pf => {
      this.presupuestoFinanciero = pf;
    })
  }

  getPeriodos(proyectoId) {
    this.proyectoService.getPeriodoActual(proyectoId, this.forecast).subscribe(periodoActual => {
      this.periodos = [...Array(periodoActual).keys(), periodoActual];
    })
  }

  getCuentaPeriodo(cuentasPeriodo, periodo, defaultCero = true, signoInvertido = false) {
    var periodo = cuentasPeriodo && cuentasPeriodo.find(cuentaPeriodo => cuentaPeriodo.periodo === periodo)
    var montoCrudo = periodo ? periodo.monto : (defaultCero ? 0 : "");
    montoCrudo = signoInvertido ? -montoCrudo : montoCrudo;
    if (montoCrudo < 0) {
      return "(" + Math.abs(montoCrudo).toLocaleString() + ")";
    } else if (montoCrudo === 0) {
      return montoCrudo;
    } else {
      return montoCrudo.toLocaleString();
    }
  }

  getTotalAcumulado(cuentasPeriodo){
    var totalAcumulado = cuentasPeriodo.reduce((total,cp) => total + cp.monto,0 );
    if (totalAcumulado < 0) {
      return "(" + Math.abs(totalAcumulado).toLocaleString() + ")";
    } else if (totalAcumulado === 0) {
      return totalAcumulado;
    } else {
      return totalAcumulado.toLocaleString();
    }
  }

}
