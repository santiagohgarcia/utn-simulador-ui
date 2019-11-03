import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from '../cursos.service';
import { EscenariosService } from '../escenarios.service';
import { Message, MessageSpan } from '@angular/compiler/src/i18n/i18n_ast';
import { MessagesService } from '../messages.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  puntajes

  configuracionMercado;

  constructor(private route: ActivatedRoute, private cursosService: CursosService,
    private escenariosService: EscenariosService,
    private messageService: MessagesService) { }

  ngOnInit() {
    const escenarioId = Number(this.route.snapshot.paramMap.get('escenarioId'));
    const cursoId = Number(this.route.snapshot.paramMap.get('cursoId'));
    this.getCurso(cursoId)
    this.getEscenario(escenarioId);
    this.getDetalleEscenarioUsuariosPorCurso(escenarioId, cursoId);
    this.getPuntajes(escenarioId)
  }

  getPuntajes(escenarioId) {
    this.escenariosService.getPuntajes(escenarioId).subscribe(puntajes => {
      if (puntajes) {
        this.puntajes = puntajes;
      }
    })
  }



  getConfiguracionMercado(escenario) {
    this.escenariosService.getConfiguracionMercado(escenario.id).subscribe(configuracionMercado => {
      if (configuracionMercado.restriccionPrecio) {
        this.configuracionMercado = configuracionMercado;
      } else {
        this.setConfiguracionMercado(escenario)
      }
    })
  }

  setConfiguracionMercado(escenario) {
    const arrayPeriodos = [...Array(escenario.maximosPeriodos).keys()],
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
          periodo: index + 1,
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
      this.getConfiguracionMercado(escenario)
    })
  }

  getDetalleEscenarioUsuariosPorCurso(escenarioId, cursoId) {
    this.escenariosService.getDetalleEscenarioUsuariosPorCurso(escenarioId, cursoId).subscribe(jugadores => this.jugadores = jugadores)
  }

  cerrarEscenario() {
    this.escenariosService.getConfiguracionMercado(this.escenario.id).subscribe(configuracionMercado => {
      if (configuracionMercado.restriccionPrecio) {
            this.escenariosService.simularMercado(this.escenario.id, this.curso.id).subscribe(_ => {
              this.messageService.openSnackBar("Simulacion de Mercado ejecutada correctamente")
            })
      } else {
        this.messageService.openSnackBar("Antes de cerrar el escenario, debe guardar las configuraciones de mercado")
      }
    })
  }



}
