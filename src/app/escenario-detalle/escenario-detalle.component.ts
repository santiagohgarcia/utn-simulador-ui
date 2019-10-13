import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EscenariosService } from '../escenarios.service';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-escenario-detalle',
  templateUrl: './escenario-detalle.component.html',
  styleUrls: ['./escenario-detalle.component.css']
})
export class EscenarioDetalleComponent implements OnInit {
  escenario = {
    id: null,
    titulo: '',
    maximosPeriodos: null,
    nombrePeriodos: '',
    descripcion: '',
    impuestoPorcentaje: null,
    balanceInicial: {
      activo: {
        caja: 0,
        cuentasPorCobrar: 0,
        cuentasPorCobrarPeriodos: 0,
        inventario: 0,
        maquinaria: 0,
        amortizacionAcumulada: 0
      },
      pasivo: {
        proveedores: 0,
        proveedoresPeriodos: 0,
        deudasBancarias: 0,
        deudasBancariasPeriodos: 0
      },
      patrimonioNeto: {
        capitalSocial: 0,
        resultadoDelEjercicio: 0
      }
    },
    invalid: null
  };

  descripcion = new FormControl('', [Validators.required]);
  titulo = new FormControl('', [Validators.required]);
  maximosPeriodos = new FormControl(new Number(), [Validators.required]);
  nombrePeriodos = new FormControl('', [Validators.required]);
  impuestoPorcentaje = new FormControl(new Number(), [Validators.required, Validators.min(0), Validators.max(99.9)]);
  escenarioForm: FormGroup = new FormGroup({
    descripcion: this.descripcion,
    titulo: this.titulo,
    maximosPeriodos: this.maximosPeriodos,
    nombrePeriodos: this.nombrePeriodos
  });

  caja = new FormControl(new Number(), [Validators.required, Validators.min(0)]);
  cuentasPorCobrar = new FormControl(new Number(), [Validators.required, Validators.min(0)]);
  cuentasPorCobrarPeriodos = new FormControl(new Number(), [Validators.required, Validators.min(0)]);
  inventario = new FormControl(new Number(), [Validators.required, Validators.min(0)]);
  maquinaria = new FormControl(new Number(), [Validators.required, Validators.min(0)]);
  amortizacionAcumulada = new FormControl(new Number(), [Validators.required, Validators.min(0)]);
  activoForm: FormGroup = new FormGroup({
    caja: this.caja,
    cuentasPorCobrar: this.cuentasPorCobrar,
    inventario: this.inventario,
    maquinaria: this.maquinaria,
    amortizacionAcumulada: this.amortizacionAcumulada
  });

  proveedores = new FormControl(new Number(), [Validators.required, Validators.min(0)]);
  proveedoresPeriodos = new FormControl(new Number(), [Validators.required, Validators.min(0)]);
  deudasBancarias = new FormControl(new Number(), [Validators.required, Validators.min(0)]);
  deudasBancariasPeriodos = new FormControl(new Number(), [Validators.required, Validators.min(0)]);
  pasivoForm: FormGroup = new FormGroup({
    proveedores: this.proveedores,
    proveedoresPeriodos: this.proveedoresPeriodos,
    deudasBancarias: this.deudasBancarias,
    deudasBancariasPeriodos: this.deudasBancariasPeriodos
  });

  capitalSocial = new FormControl(new Number(), [Validators.required, Validators.min(0)]);
  resultadoDelEjercicio = new FormControl(new Number(), [Validators.required, Validators.min(0)]);
  patrimonioNetoForm: FormGroup = new FormGroup({
    capitalSocial: this.capitalSocial,
    resultadoDelEjercicio: this.resultadoDelEjercicio
  });

  calidad = new FormControl(new Number(), [Validators.required, Validators.min(0)]);
  costoFijo = new FormControl(new Number(), [Validators.required, Validators.min(0)]);
  costoVariable = new FormControl(new Number(), [Validators.required, Validators.min(0)]);
  produccionMensual = new FormControl(new Number(), [Validators.required, Validators.min(0)]);
  stock = new FormControl(new Number(), [Validators.required, Validators.min(0)]);
  estadoInicialForm: FormGroup = new FormGroup({
    calidad: this.calidad,
    costoFijo: this.costoFijo,
    costoVariable: this.costoVariable,
    produccionMensual: this.produccionMensual,
    stock: this.stock
  });

  forecasts = [{
    proyectoId: 1,
    periodo: 0,
    cantidadUnidades: 0,
    precio: 0
  }, {
    proyectoId: 1,
    periodo: 1,
    cantidadUnidades: 0,
    precio: 0
  }, {
    proyectoId: 1,
    periodo: 2,
    cantidadUnidades: 0,
    precio: 0
  }, {
    proyectoId: 1,
    periodo: 3,
    cantidadUnidades: 0,
    precio: 0
  }]

  constructor(private escenariosService: EscenariosService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessagesService) { }

  ngOnInit() {
    var id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getEscenario(id).subscribe(escenario => this.escenario = escenario);
    }
  }

  getEscenario(id) {
    return this.escenariosService.getEscenario(id);
  }

  getPeriodosArray() {
    var maximosPeriodos = Number(this.escenario.maximosPeriodos);
    return [...Array(maximosPeriodos).keys(), maximosPeriodos];
  }

  save() {
    if (this.escenarioForm.valid && this.activoForm.valid && this.pasivoForm.valid && this.patrimonioNetoForm.valid) {
      this.escenariosService[this.escenario.id ? 'modifyEscenario' : 'createEscenario'](this.escenario)
        .subscribe(_ => {
          this.messageService.openSnackBar("Escenario modificado");
          this.router.navigate(['/escenarios'])
        });
    }
  }


}
