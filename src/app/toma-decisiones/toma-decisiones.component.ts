import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../proyecto.service';
import { MatRadioChange } from '@angular/material';
import { Router } from '@angular/router';
import { DecisionesService } from '../decisiones.service';
import { MessagesService } from '../messages.service';


@Component({
  selector: 'app-toma-decisiones',
  templateUrl: './toma-decisiones.component.html',
  styleUrls: ['./toma-decisiones.component.css']
})
export class TomaDecisionesComponent implements OnInit {

  decisiones: Array<any> = [];
  estado;
  modalidadCobro: Array<any> = [];
  forecasts: Array<any> = [];

  constructor(private proyectoService: ProyectoService,
    private decisionesService: DecisionesService,
    private router: Router,
    private messageService: MessagesService) { }

  ngOnInit() {
    this.getDecisionesByProyecto();
    this.getEstadoBase();
    this.buildModalidadDeCobro();
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
    var periodos = this.estado.proyecto.escenario.maximosPeriodos;
      this.forecasts = [...Array(periodos).keys(), periodos].map(periodo => {
        return {
          proyectoId: 1,
          periodo: periodo,
          cantidadUnidades: 0
        }
      });
  }

  buildModalidadDeCobro() {
    this.modalidadCobro = [{
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
    }]
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
              .subscribe(_ => this.router.navigateByUrl("/resultados"))
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
    var modalidadCobroPorcentajeTotal = this.modalidadCobro.filter(elem => elem.porcentaje > 0 ) 
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
