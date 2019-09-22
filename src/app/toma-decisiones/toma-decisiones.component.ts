import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../proyecto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessagesService } from '../messages.service';
import { EscenariosService } from '../escenarios.service';


@Component({
  selector: 'app-toma-decisiones',
  templateUrl: './toma-decisiones.component.html',
  styleUrls: ['./toma-decisiones.component.css']
})
export class TomaDecisionesComponent implements OnInit {

  decisiones: Array<any> = [];
  escenario;
  estado;
  modalidadCobro: Array<any> = [];
  forecasts: Array<any> = [];

  constructor(
    private proyectoService: ProyectoService,
    private escenarioService: EscenariosService,
    private router: Router,
    private route: ActivatedRoute, 
    private messageService: MessagesService) { }

  ngOnInit() {
    var escenarioId = Number(this.route.snapshot.paramMap.get('escenarioId'));
    this.getEscenario(escenarioId);
    this.getEstadoBase();
    this.buildModalidadDeCobro();
    this.getDecisionesByProyecto();
  }

  getEscenario(escenarioId){
    this.escenarioService.getEscenario(escenarioId).subscribe(escenario => this.escenario = escenario);
  }

  getEstadoBase() {
    this.proyectoService.getEstadoBase(1).subscribe(estado => {
      this.estado = estado;
      this.buildForecast();
    });
  }

  getDecisionesByProyecto() {
    this.proyectoService.getDecisiones(1)
      .subscribe(decisiones => this.decisiones = decisiones);
  }

  buildForecast() {
    this.proyectoService.getForecast(1).subscribe(forecasts => {
      var periodos = this.estado.proyecto.escenario.maximosPeriodos;
      this.forecasts = forecasts.length > 0 ? forecasts : [...Array(periodos).keys(), periodos].map(periodo => {
        return {
          proyectoId: 1,
          periodo: periodo,
          cantidadUnidades: 0,
          precioVenta: 0
        }
      });
    })

  }

  buildModalidadDeCobro() {
    var modalidadCobroTemplate = [{
      proyectoId: 1,
      offsetPeriodo: 0,
      porcentaje: 0
    }, {
      proyectoId: 1,
      offsetPeriodo: 1,
      porcentaje: 0
    }, {
      proyectoId: 1,
      offsetPeriodo: 2,
      porcentaje: 0
    }, {
      proyectoId: 1,
      offsetPeriodo: 3,
      porcentaje: 0
    }];
    this.proyectoService.getModalidadCobro(1).subscribe(modalidadCobro => {
      if (modalidadCobro) {
        this.modalidadCobro = modalidadCobroTemplate.map(mct => {
          return { ...mct, ...modalidadCobro.find(mc => mc.offsetPeriodo === mct.offsetPeriodo) };
        });
      } else {
        this.modalidadCobro = modalidadCobroTemplate;
      }
    })
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

  simular() {
    if (this.inputsValidos()) {
      //Grabar FORECAST
      this.proyectoService.forecast(1, this.forecasts)
        .subscribe(_ => {
          //Grabar MODALIDAD COBRO
          this.proyectoService.modalidadCobro(1, this.modalidadCobro).subscribe(_ => {
            //SIMULAR
            this.proyectoService.simular(1, this.getOpcionesTomadas())
              .subscribe(_ => this.router.navigateByUrl(`/simulaciones/escenario/${this.escenario.id}/resultados`))
          })
        }
        );
    }
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

    return true;
  }



}
