import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../proyecto.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

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

  flujoFondos : Array<any>;
  displayedColumns: string[] = ["descripcion","0","1","2","3","4","5"];

  constructor(private proyectoService: ProyectoService) { }

  ngOnInit() {
    this.getFlujoFondos();
  }

  getFlujoFondos() {
    this.proyectoService.getFlujoFondos(1).subscribe( ff => {
     this.flujoFondos = [
       {...ff.INGRESOS_AFECTOS_A_IMPUESTOS, ...{key: "INGRESOS_AFECTOS_A_IMPUESTOS"}},
       {...ff.EGRESOS_AFECTOS_A_IMPUESTOS, ...{key: "EGRESOS_AFECTOS_A_IMPUESTOS"}},
       {...ff.GASTOS_NO_DESEMBOLSABLES, ...{key: "GASTOS_NO_DESEMBOLSABLES"}},
       {...ff.UTILIDAD_ANTES_DE_IMPUESTOS, ...{key: "UTILIDAD_NETA_ANTES_DE_IMPUESTOS"}},
       {...ff.IMPUESTOS, ...{key: "IMPUESTOS"}},
       {...ff.UTILIDAD_DESPUES_DE_IMPUESTOS, ...{key: "UTILIDAD_DESPUES_DE_IMPUESTOS"}},
       {...ff.AJUSTE_DE_GASTOS_NO_DESEMBOLSABLES, ...{key: "AJUSTE_DE_GASTOS_NO_DESEMBOLSABLES"}},
       {...ff.FLUJO_DE_FONDOS, ...{key: "FLUJO_DE_FONDOS"}}
     ]
    })
  }

  getCuentaPeriodo(cuentasPeriodo,periodo,defaultCero = true){
    var periodo = cuentasPeriodo && cuentasPeriodo.find(cuentaPeriodo => cuentaPeriodo.periodo === periodo )
    return periodo ? periodo.monto : ( defaultCero ? 0 : ""  );
  }
}
