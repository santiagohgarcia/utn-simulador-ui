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

  configuracionMercado;

  ventasQuintil1 = new FormControl('', [Validators.required]);
  ventasQuintil2 = new FormControl('', [Validators.required]);
  ventasQuintil3 = new FormControl('', [Validators.required]);
  ventasQuintil4 = new FormControl('', [Validators.required]);
  ventasQuintil5 = new FormControl('', [Validators.required]);
  ventasForm: FormGroup = new FormGroup({
    ventasQuintil1: this.ventasQuintil1,
    ventasQuintil2: this.ventasQuintil2,
    ventasQuintil3: this.ventasQuintil3,
    ventasQuintil4: this.ventasQuintil4,
    ventasQuintil5: this.ventasQuintil5
  });

  cajaQuintil1 = new FormControl('', [Validators.required]);
  cajaQuintil2 = new FormControl('', [Validators.required]);
  cajaQuintil3 = new FormControl('', [Validators.required]);
  cajaQuintil4 = new FormControl('', [Validators.required]);
  cajaQuintil5 = new FormControl('', [Validators.required]);
  cajaForm: FormGroup = new FormGroup({
    cajaQuintil1: this.cajaQuintil1,
    cajaQuintil2: this.cajaQuintil2,
    cajaQuintil3: this.cajaQuintil3,
    cajaQuintil4: this.cajaQuintil4,
    cajaQuintil5: this.cajaQuintil5
  });

  rentaQuintil1 = new FormControl('', [Validators.required]);
  rentaQuintil2 = new FormControl('', [Validators.required]);
  rentaQuintil3 = new FormControl('', [Validators.required]);
  rentaQuintil4 = new FormControl('', [Validators.required]);
  rentaQuintil5 = new FormControl('', [Validators.required]);
  rentaForm: FormGroup = new FormGroup({
    rentaQuintil1: this.rentaQuintil1,
    rentaQuintil2: this.rentaQuintil2,
    rentaQuintil3: this.rentaQuintil3,
    rentaQuintil4: this.rentaQuintil4,
    rentaQuintil5: this.rentaQuintil5
  });

  puntajes = {
    ventas: {
      escenarioId: null,
      concepto: "VENTAS",
      quintil1: 0, quintil2: 0, quintil3: 0, quintil4: 0, quintil5: 0
    },
    caja: {
      escenarioId: null,
      concepto: "CAJA",
      quintil1: 0, quintil2: 0, quintil3: 0, quintil4: 0, quintil5: 0
    },
    renta: {
      escenarioId: null,
      concepto: "RENTA",
      quintil1: 0, quintil2: 0, quintil3: 0, quintil4: 0, quintil5: 0
    }
  }

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
    this.getPuntajes(escenarioId)
  }

  getPuntajes(escenarioId) {
    this.escenariosService.getPuntajes(escenarioId).subscribe(puntajes => {
      if (puntajes.ventas) {
        this.puntajes = puntajes;
      } else {
        this.puntajes.ventas.escenarioId = escenarioId;
        this.puntajes.caja.escenarioId = escenarioId;
        this.puntajes.renta.escenarioId = escenarioId;
      }
    })
  }

  savePuntajes() {
    if (this.ventasForm.valid && this.cajaForm.valid && this.rentaForm.valid) {
      this.escenariosService.postPuntajes(this.puntajes).subscribe(_ => {
        this.messageService.openSnackBar("Puntajes grabados correctamente")
        this.getPuntajes(this.escenario.id)
      })
    }
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
    this.escenariosService.getConfiguracionMercado(this.escenario.id).subscribe(configuracionMercado => {
      if (configuracionMercado.restriccionPrecio) {
        if (this.ventasForm.valid && this.cajaForm.valid && this.rentaForm.valid) {
          this.escenariosService.postPuntajes(this.puntajes).subscribe(_ => {
            this.escenariosService.simularMercado(this.escenario.id, this.curso.id).subscribe(_ => {
              this.messageService.openSnackBar("Simulacion de Mercado ejecutada correctamente")
            })
          })
        }
      } else {
        this.messageService.openSnackBar("Antes de cerrar el escenario, debe guardar las configuraciones de mercado")
      }
    })
  }

}
