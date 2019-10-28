import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from '../cursos.service';
import { EscenariosService } from '../escenarios.service';
import { Message, MessageSpan } from '@angular/compiler/src/i18n/i18n_ast';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-estado-juego-detail',
  templateUrl: './estado-juego-detail.component.html',
  styleUrls: ['./estado-juego-detail.component.css']
})
export class EstadoJuegoDetailComponent implements OnInit {

  escenario;
  curso;
  ventasChartProps;
  jugadores;

  configuracionMercado;

  constructor(private route: ActivatedRoute, private cursosService: CursosService, 
    private escenariosService: EscenariosService,
    private messageService: MessagesService) { }

  ngOnInit() {
    const escenarioId = Number(this.route.snapshot.paramMap.get('escenarioId'));
    const cursoId = Number(this.route.snapshot.paramMap.get('cursoId'));
    this.getCurso(cursoId)
    this.getEscenario(escenarioId);
    this.setVentasChartProps();
    this.getDetalleEscenarioUsuariosPorCurso(escenarioId, cursoId);

  }

  setConfiguracionMercado(escenario) {
    const arrayPeriodos = [...Array(escenario.maximosPeriodos - 1).keys()],
      array3 = [...Array(3).keys()],
      array4 = [...Array(4).keys()];
    this.configuracionMercado = {
      empresasCompetidoras: array3.map((_, index) => {
        return {
          escenarioId: escenario.id,
          nombre: null,
          bajo: 0,
          medio: 0,
          alto: 0
        }
      }),
      mercadosPeriodo: arrayPeriodos.map((_, index) => {
        return {
          escenarioId: escenario.id,
          periodo: escenario.nombrePeriodos + " " + (index+1),
          bajo: 0,
          medio: 0,
          alto: 0
        }
      }),
      ponderacionesMercado: {
        precioDesde: array3.map((_, index) => {
          return {
            escenarioId: escenario.id,
            concepto: "PRECIO_DESDE",
            valor: 0,
            bajo: 0,
            medio: 0,
            alto: 0
          }
        }),
        vendedoresDesde: array3.map((_, index) => {
          return {
            escenarioId: escenario.id,
            concepto: "VENDEDORES_DESDE",
            valor: 0,
            bajo: 0,
            medio: 0,
            alto: 0
          }
        }),
        publicidadDesde: array3.map((_, index) => {
          return {
            escenarioId: escenario.id,
            concepto: "PUBLICIDAD_DESDE",
            valor: 0,
            bajo: 0,
            medio: 0,
            alto: 0
          }
        }),
        modalidadCobro: array4.map((_, index) => {
          return {
            escenarioId: escenario.id,
            concepto: "MODALIDAD_DE_COBRO",
            valor: index,
            bajo: 0,
            medio: 0,
            alto: 0
          }
        }),
        calidadDesde: array3.map((_, index) => {
          return {
            escenarioId: escenario.id,
            concepto: "CALIDAD_DESDE",
            valor: 0,
            bajo: 0,
            medio: 0,
            alto: 0
          }
        })
      },
      restriccionPrecio: {
        escenarioId: escenario.id,
        precioMin: 0,
        precioMax: 0
      }
    }
  }

  getModalidadCobroDesc(modCobroIndex) {
    return ["Contado", "a 30 dias", "a 60 dias", "a 90 dias"][modCobroIndex]
  }

  getCurso(cursoId) {
    this.cursosService.getCurso(cursoId).subscribe(curso => this.curso = curso)
  }

  getEscenario(escenarioId) {
    this.escenariosService.getEscenario(escenarioId).subscribe(escenario => {
      this.escenario = escenario
      this.setConfiguracionMercado(escenario)
    })
  }

  getDetalleEscenarioUsuariosPorCurso(escenarioId, cursoId) {
    this.escenariosService.getDetalleEscenarioUsuariosPorCurso(escenarioId, cursoId).subscribe(jugadores => this.jugadores = jugadores)
  }

  setVentasChartProps() {
    this.ventasChartProps = {
      options: {
        scaleShowVerticalLines: false,
        responsive: true,
        aspectRatio: 3
      },
      labels: [
        "Ron Swanson",
        "Leslie Knope",
        "Perd Hapley",
        "Tom Haveford",
        "Pam Beasly",
        "Donna",
        "Garry Gergich",
        "Ben Wyatt"
      ],
      type: 'horizontalBar',
      legend: false,
      data: [
        {
          data: [2000, 1800, 1600, 1400, 1300, 1200, 1000, 800],
          label: 'Ventas',
          backgroundColor: [
            "rgba(75, 192, 192, 0.5)",
            "rgba(75, 192, 192, 0.5)",
            "rgba(75, 192, 192, 0.5)",
            "rgba(255, 205, 86, 0.5)",
            "rgba(255, 205, 86, 0.5)",
            "rgba(255, 205, 86, 0.5)",
            "rgba(255, 99, 132, 0.5)",
            "rgba(255, 99, 132, 0.5)"
          ],
          borderColor: [
            "rgb(75, 192, 192)",
            "rgb(75, 192, 192)",
            "rgb(75, 192, 192)",
            "rgb(255, 205, 86)",
            "rgb(255, 205, 86)",
            "rgb(255, 205, 86)",
            "rgb(255, 99, 132)",
            "rgb(255, 99, 132)"
          ]
        }
      ]
    }
  }

  cerrarEscenario() {
    const error = this._getErroresConfiguracionesMercado();
    if(error){
      this.messageService.openSnackBar(error)
    }else{
      this.saveConfiguracionesMercado().subscribe(_ => {
        
      })
    }
  }

  saveConfiguracionesMercado(){
    return this.escenariosService.postConfiguracionesMercado(this.configuracionMercado);
  }

  _getErroresConfiguracionesMercado() {
    return [this._validateObligatory(this.configuracionMercado.empresasCompetidoras, "nombre"),
    this._validateObligatory(this.configuracionMercado.mercadosPeriodo, null),
    this._validateObligatory(this.configuracionMercado.ponderacionesMercado.precioDesde, "valor"),
    this._validateSecuencia(this.configuracionMercado.ponderacionesMercado.precioDesde, "valor"),
    this._validatePrecioContraIntervalo(),
    this._validateObligatory(this.configuracionMercado.ponderacionesMercado.modalidadCobro, "valor"),
    this._validateSecuencia(this.configuracionMercado.ponderacionesMercado.modalidadCobro, "valor"),
    this._validateObligatory(this.configuracionMercado.ponderacionesMercado.publicidadDesde, "valor"),
    this._validateSecuencia(this.configuracionMercado.ponderacionesMercado.publicidadDesde, "valor"),
    this._validateObligatory(this.configuracionMercado.ponderacionesMercado.calidadDesde, "valor"),
    this._validateSecuencia(this.configuracionMercado.ponderacionesMercado.calidadDesde, "valor"),
    this._validateObligatory(this.configuracionMercado.ponderacionesMercado.vendedoresDesde, "valor"),
    this._validateSecuencia(this.configuracionMercado.ponderacionesMercado.vendedoresDesde, "valor"),
    this._validateIntervaloPrecio()].find(elem => elem !== true)
  }

  _validateSecuencia(array,prop){
    var arrayValor = array.map( elem => elem[prop]),
        arrayOrdernado = arrayValor.concat([]).sort((a,b) => a > b ? 1 : -1);
    if(JSON.stringify(arrayOrdernado) !== JSON.stringify(arrayValor)){
      return "Revise las secuencias de valores en las configuraciones de mercado"
    }
    return true;
  }

  _validateObligatory(array, additionalProp) {
    return array.find(elem => {
      return ( !(elem.bajo >= 0 && elem.medio >= 0 && elem.alto >= 0) ||
        (additionalProp ? !(elem[additionalProp] || elem[additionalProp] === 0) : false))
    }) ? "Falta completar datos en la configuracion del mercado" : true;
  }

  _validatePrecioContraIntervalo() {
    return this.configuracionMercado.ponderacionesMercado.precioDesde.find(elem => {
      return (elem.valor > this.configuracionMercado.restriccionPrecio.precioMax ||
        elem.valor < this.configuracionMercado.restriccionPrecio.precioMin)
    }) ? "El rango de precios y los precios ingresados no coinciden" : true;
  }

  _validateIntervaloPrecio() {
    return (this.configuracionMercado.restriccionPrecio.precioMin > 0 &&
      this.configuracionMercado.restriccionPrecio.precioMax > 0 && 
      this.configuracionMercado.restriccionPrecio.precioMin < this.configuracionMercado.restriccionPrecio.precioMax )
      ? true : "Ingrese un Intervalo de Precio valido"
  }

}
