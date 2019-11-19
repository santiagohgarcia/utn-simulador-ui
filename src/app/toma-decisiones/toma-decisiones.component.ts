import { Component, OnInit, EventEmitter } from '@angular/core';
import { ProyectoService } from '../proyecto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessagesService } from '../messages.service';
import { EscenariosService } from '../escenarios.service';
import { UsuarioService } from '../usuario.service';
import { MatRadioChange } from '@angular/material';


@Component({
  selector: 'app-toma-decisiones',
  templateUrl: './toma-decisiones.component.html',
  styleUrls: ['./toma-decisiones.component.css']
})
export class TomaDecisionesComponent implements OnInit {

  decisiones: Array<any> = [];
  escenario;
  estado;
  proyecto;
  modalidadCobro: Array<any> = [];
  forecasts: Array<any> = [];
  proveedores: Array<any> = [];
  proveedorSeleccionado;
  usuario;
  financiaciones;
  credito;
  totalActivo = 0;
  totalPasivoPatrimonioNeto = 0;

  constructor(
    private proyectoService: ProyectoService,
    private escenarioService: EscenariosService,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessagesService) { }

  ngOnInit() {
    var escenarioId = Number(this.route.snapshot.paramMap.get('escenarioId'));
    this.getProyecto(escenarioId, this.usuarioService.usuario.id);
    this.getFinanciaciones(escenarioId);
  }

  getEscenario(escenarioId) {
    this.escenarioService.getEscenario(escenarioId).subscribe(escenario => this.escenario = escenario);
  }

  getFinanciaciones(escenarioId) {
    this.escenarioService.getFinanciaciones(escenarioId).subscribe(financiaciones => this.financiaciones = financiaciones);
  }

  getProyecto(escenarioId, usuarioId) {
    this.usuarioService.getProyecto(escenarioId, usuarioId).subscribe(estado => {
      this.estado = estado;
      this.proyecto = estado.proyecto;
      this.escenario = estado.proyecto.escenario;
      this.getTotalActivo();
      this.getTotalPasivoPatrimonioNeto();
      this.getProveedores(this.proyecto.id)
      this.getCredito(this.proyecto.id)
      this.getDecisiones(this.proyecto.id)
      this.buildModalidadDeCobro(this.proyecto.id, estado.proyecto.modalidadCobro);
      this.buildForecast(this.proyecto.id);
    });
  }

  getCredito(proyectoId) {
    this.proyectoService.getCredito(proyectoId)
      .subscribe(credito => this.credito = credito || {
        monto: 0,
        periodoInicial: 0,
        proyectoId: this.proyecto.id
      });
  }

  getDecisiones(proyectoId) {
    this.proyectoService.getDecisiones(proyectoId)
      .subscribe(decisiones => this.decisiones = decisiones);
  }


  getProveedores(proyectoId) {
    this.proyectoService.getProveedores(proyectoId).subscribe(proveedores => {
      this.proveedores = proveedores;
      var proveedorSeleccionado = proveedores.find(p => p.seleccionado)
      if (proveedorSeleccionado) {
        this.proveedorSeleccionado = proveedorSeleccionado.id;
      }
    })
  }

  buildForecast(proyectoId) {
    this.proyectoService.getForecast(proyectoId).subscribe(forecasts => {
      var periodos = this.estado.proyecto.escenario.maximosPeriodos;
      if(forecasts.length > 0 && forecasts.length >= periodos + 1) { 
        this.forecasts = forecasts.slice(0, periodos + 1)
      } else {
        var periodosFaltantes = [...Array(periodos - forecasts.length).keys(), periodos - forecasts.length].map(periodo => {
          return {
            proyectoId: proyectoId,
            periodo: forecasts.length + periodo,
            cantidadUnidades: 0,
            precio: 0
          }
        });
        this.forecasts = this.forecasts.concat(forecasts);
        this.forecasts = this.forecasts.concat(periodosFaltantes);
      }
    })

  }

  buildModalidadDeCobro(proyectoId, modalidadCobro) {
    var modalidadCobroTemplate = [{
      proyectoId: this.proyecto.id,
      offsetPeriodo: 0,
      porcentaje: 0
    }, {
      proyectoId: this.proyecto.id,
      offsetPeriodo: 1,
      porcentaje: 0
    }, {
      proyectoId: this.proyecto.id,
      offsetPeriodo: 2,
      porcentaje: 0
    }, {
      proyectoId: this.proyecto.id,
      offsetPeriodo: 3,
      porcentaje: 0
    }];
    if (modalidadCobro) {
      this.modalidadCobro = modalidadCobroTemplate.map(mct => {
        return { ...mct, ...modalidadCobro.find(mc => mc.offsetPeriodo === mct.offsetPeriodo) };
      });
    } else {
      this.modalidadCobro = modalidadCobroTemplate;
    }
  }

  getModalidadDePagoParaPeriodo(modalidadPago, periodo) {
    if (modalidadPago) {
      var modalidadDePagoParaPeriodo = modalidadPago.find(mp => mp.offsetPeriodo === periodo);
    }
    return (modalidadDePagoParaPeriodo && modalidadDePagoParaPeriodo.porcentaje > 0) ?
      `${modalidadDePagoParaPeriodo.porcentaje}%` : "";
  }

  getModalidadDeCobroDescr(offsetPeriodo) {
    return {
      0: "Contado",
      1: "a 30 Dias",
      2: "a 60 Dias",
      3: "a 90 Dias"
    }[offsetPeriodo];
  }

  getCantidadDecisionesTomadas() {
    return this.decisiones ? this.decisiones.filter(d => d.opcionTomada).length : 0;
  }

  getOpcionesTomadas() {
    return this.decisiones.map(d => d.opciones.find(o => o.id === d.opcionTomada)).filter(d => d);
  }

  getAumentoCostoFijo() {
    var aumentoCostoFijo = 0;
    this.getOpcionesTomadas().forEach(o => aumentoCostoFijo = aumentoCostoFijo + o.variacionCostoFijo);
    return aumentoCostoFijo != 0 ? (aumentoCostoFijo % 1 != 0 ? aumentoCostoFijo.toFixed(2) : aumentoCostoFijo) : null;
  }

  getAumentoCostoVariable() {
    var aumentoCostoVariable = this.getProveedorSeleccionado() ? this.getProveedorSeleccionado().variacionCostoVariable : 0;
    this.getOpcionesTomadas().forEach(o => aumentoCostoVariable = aumentoCostoVariable + o.variacionCostoVariable);
    return aumentoCostoVariable != 0 ? (aumentoCostoVariable % 1 != 0 ? aumentoCostoVariable.toFixed(2) : aumentoCostoVariable) : null;
  }

  getAumentoProduccionMensual() {
    var aumentoProduccionMensual = 0;
    this.getOpcionesTomadas().forEach(o => aumentoProduccionMensual = aumentoProduccionMensual + o.variacionProduccion);
    return aumentoProduccionMensual != 0 ? aumentoProduccionMensual : null;
  }

  getAumentoCalidad() {
    var aumentoCalidad = this.getProveedorSeleccionado() ? this.getProveedorSeleccionado().variacionCalidad : 0;
    this.getOpcionesTomadas().forEach(o => aumentoCalidad = aumentoCalidad + o.variacionCalidad);
    return aumentoCalidad != 0 ? aumentoCalidad : null;
  }

  getAumentoPublicidad() {
    var aumentoPublicidad = 0;
    this.getOpcionesTomadas().forEach(o => aumentoPublicidad = aumentoPublicidad + o.variacionPublicidad);
    return aumentoPublicidad != 0 ? aumentoPublicidad : null;
  }

  getAumentoCantidadVendedores() {
    var aumentoCantidadVendedores = 0;
    this.getOpcionesTomadas().forEach(o => aumentoCantidadVendedores = aumentoCantidadVendedores + o.variacionCantidadVendedores);
    return aumentoCantidadVendedores != 0 ? aumentoCantidadVendedores : null;
  }


  simular() {
    if (this.inputsValidos()) {
      //Grabar FORECAST
      this.proyectoService.forecast(this.proyecto.id, this.forecasts)
        .subscribe(_ => {
          //Grabar MODALIDAD COBRO
          this.proyectoService.modalidadCobro(this.proyecto.id, this.modalidadCobro).subscribe(_ => {
            //Grabar PROVEEDORES
            this.proyectoService.proveedorSeleccionado(this.proyecto.id, this.proveedorSeleccionado).subscribe(_ => {
              //Grabar Credito
              this.proyectoService.tomarCredito(this.credito).subscribe(_ => {
                //SIMULAR
                this.proyectoService.simular(this.proyecto.id, this.getOpcionesTomadas())
                  .subscribe(_ => this.router.navigateByUrl(`/simulaciones/escenario/${this.escenario.id}/resultados`))
              })
            })
          })
        });
    }
  }

  _simular() {

  }

  getEvenNumber = function(num) {
    return Math.floor(Number(num)/2) > 0 ? new Array(Math.floor(Number(num)/2)) : new Array(0);
  }

  getOddNumber = function(num) {
    return Number(num) % 2 != 0;
  }

  getTotalActivo() {
    this.totalActivo = this.escenario.balanceInicial.activo.caja + this.escenario.balanceInicial.activo.cuentasPorCobrar + this.escenario.balanceInicial.activo.inventario + this.escenario.balanceInicial.activo.maquinaria + this.escenario.balanceInicial.activo.amortizacionAcumulada;
  }

  getTotalPasivoPatrimonioNeto() {
    this.totalPasivoPatrimonioNeto = this.escenario.balanceInicial.pasivo.proveedores + this.escenario.balanceInicial.pasivo.deudasBancarias + this.escenario.balanceInicial.patrimonioNeto.capitalSocial + this.escenario.balanceInicial.patrimonioNeto.resultadoDelEjercicio;
  }

  inputsValidos() {

    //Validar si se tomaron todas las opciones
    var opcionesTomadas = this.getOpcionesTomadas();
    if (opcionesTomadas.length !== this.decisiones.length) {
      this.messageService.openSnackBar("Toma todas las decisiones antes de simular!");
      return false;
    }

    //Validar si el porcentaje de cobro es 100% en total entre todos los periodos
    var modalidadCobroPorcentajeTotal = this.modalidadCobro.filter(elem => elem.porcentaje > 0)
      .reduce((acum, elem) => acum + elem.porcentaje, 0)
    if (modalidadCobroPorcentajeTotal !== 100) {
      this.messageService.openSnackBar("Los porcentajes en su modalidad de cobro deben sumar 100%!");
      return false;
    }

    //Validar si los valores de forecast de venta son correctos
    var forecastNegativos = this.forecasts.filter(forecast => forecast.cantidadUnidades !== null && forecast.cantidadUnidades < 0)
    if (forecastNegativos.length > 0) {
      this.messageService.openSnackBar("Todas las cantidades vendidas del forecast de venta deben ser numeros positivos");
      return false;
    }

    //Validar Proveedor seleccionado
    if (!this.proveedorSeleccionado) {
      this.messageService.openSnackBar("Por favor seleccione un proveedor");
      return false;
    }

    //Validar Credito: Valores negaticos
    if (this.credito.monto < 0 || this.credito.periodoInicial < 0) {
      this.messageService.openSnackBar("El monto de financiacion y el periodo inicial deben ser numeros positivos");
      return false;
    }

    //Validar Credito seleccionado
    if (this.credito.monto > 0 && !this.credito.financiacionId) {
      this.messageService.openSnackBar("Usted ha dispuesto un monto de financiacion. Por favor seleccione un tipo de credito");
      return false;
    }

     //Validar Credito periodo valido
     if (this.credito.monto > 0 && this.credito.periodoInicial > this.escenario.maximosPeriodos) {
      this.messageService.openSnackBar("El Periodo Inicial del credito no puede ser mayor a los periodos del ejercicio");
      return false;
    }


    return true;
  }

  onSeleccionarProveedor(proveedor) {
    this.proveedorSeleccionado = proveedor.id;
  }

  onSeleccionarFinanciacion(financiacion) {
    this.credito.financiacionId = financiacion.id;
  }

  getProveedorSeleccionado() {
    return this.proveedores.find(p => p.id == this.proveedorSeleccionado);
  }


}
