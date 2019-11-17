import { Component, OnInit, Input } from '@angular/core';
import { ProyectoService } from '../proyecto.service';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-presupuesto-economico',
  templateUrl: './presupuesto-economico.component.html',
  styleUrls: ['./presupuesto-economico.component.css']
})
export class PresupuestoEconomicoComponent implements OnInit {
  @Input() proyecto: any;
  @Input() forecast: boolean;
  presupuestoEconomico;
  periodos;
  escenario;

  constructor(private proyectoService: ProyectoService) { }

  ngOnInit() {
    this.getPeriodos(this.proyecto.id);
    this.getPresupuestoEconomico(this.proyecto.id);
    this.escenario = this.proyecto.escenario;
  }

  getPresupuestoEconomico(proyectoId) {
    this.proyectoService.getPresupuestoEconomico(proyectoId,this.forecast).subscribe(pe => {
      this.presupuestoEconomico = pe;
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

  getTotalCuentaPeriodo(cuentasPeriodo, signoInvertido = false) {
    var acumulador = 0;
    if (cuentasPeriodo) {
      cuentasPeriodo.map(cp => acumulador = acumulador + cp.monto);
      acumulador = signoInvertido ? -acumulador : acumulador;
      if (acumulador < 0) {
        return "(" + Math.abs(acumulador).toLocaleString() + ")";
      } else if (acumulador === 0) {
        return acumulador;
      } else {
        return acumulador.toLocaleString();
      }
    }
  }

}
