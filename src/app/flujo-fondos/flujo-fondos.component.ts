import { Component, OnInit, Input } from '@angular/core';
import { ProyectoService } from '../proyecto.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../usuario.service';



@Component({
  selector: 'app-flujo-fondos',
  templateUrl: './flujo-fondos.component.html',
  styleUrls: ['./flujo-fondos.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class FlujoFondosComponent implements OnInit {
  @Input() proyecto: any;
  @Input() forecast: boolean;
  flujoFondos;
  periodos;
  escenario;

  constructor(private proyectoService: ProyectoService) { }

  ngOnInit() {
    this.getPeriodos(this.proyecto.id);
    this.getFlujoFondos(this.proyecto.id);
    this.escenario = this.proyecto.escenario;
  }

  getFlujoFondos(proyectoId) {
    this.proyectoService.getFlujoFondos(proyectoId, this.forecast).subscribe(ff => {
      this.flujoFondos = ff;
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
}
