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
  presupuestoEconomico;
  periodos;

  constructor(private proyectoService: ProyectoService) { }

  ngOnInit() {
    this.getPeriodos(this.proyecto.id);
    this.getPresupuestoEconomico(this.proyecto.id);
  }

  getPresupuestoEconomico(proyectoId) {
    this.proyectoService.getPresupuestoEconomico(proyectoId).subscribe(pe => {
      this.presupuestoEconomico = pe;
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
