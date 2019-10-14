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
    this.proyectoService.getPresupuestoFinanciero(proyectoId).subscribe(pf => {
      this.presupuestoFinanciero = pf;
    })
  }

  getPeriodos(proyectoId) {
    this.proyectoService.getPeriodoActual(proyectoId).subscribe(periodoActual => {
      this.periodos = [...Array(periodoActual).keys(), periodoActual];
    })
  }

  getCuentaPeriodo(cuentasPeriodo, periodo, defaultCero = true, signoInvertido = false) {
    var periodo = cuentasPeriodo && cuentasPeriodo.find(cuentaPeriodo => cuentaPeriodo.periodo === periodo)
    var montoCrudo = periodo ? periodo.monto : (defaultCero ? 0 : "");
    montoCrudo = signoInvertido ? -montoCrudo : montoCrudo;
    if (montoCrudo < 0) {
      return "(" + Math.abs(montoCrudo) + ")";
    } else {
      return montoCrudo;
    }
  }

}
