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

  flujoFondos;
  periodos;

  constructor(private proyectoService: ProyectoService) { }

  ngOnInit() {
    this.getPeriodos();
    this.getFlujoFondos();
  }

  getFlujoFondos() {
    this.proyectoService.getFlujoFondos(1).subscribe( ff => {
      this.flujoFondos = ff;
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
