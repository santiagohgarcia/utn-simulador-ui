import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EscenariosService } from '../escenarios.service';
import { MessagesService } from '../messages.service';
import { CursosService } from '../cursos.service';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material';
import { startWith, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-escenario-detalle',
  templateUrl: './escenario-detalle.component.html',
  styleUrls: ['./escenario-detalle.component.css']
})
export class EscenarioDetalleComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filtredCursos: Observable<string[]>;
  allCursos;
  configuracionMercado;
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
    estadoInicial: {
      costoFijo: 0,
      costoVariable: 0,
      stock: 0,
      produccionMensual: 0,
      calidad: 0,
      publicidad: 0,
      cantidadVendedores: 0
    },
    cursos: [],
    invalid: null
  };

  descripcion = new FormControl('', [Validators.required]);
  titulo = new FormControl('', [Validators.required]);
  maximosPeriodos = new FormControl(new Number(), [Validators.required, Validators.min(1)]);
  nombrePeriodos = new FormControl('', [Validators.required]);
  impuestoPorcentaje = new FormControl(new Number(), [Validators.required, Validators.min(0), Validators.max(99.9)]);
  cursos = new FormControl();
  escenarioForm: FormGroup = new FormGroup({
    descripcion: this.descripcion,
    titulo: this.titulo,
    maximosPeriodos: this.maximosPeriodos,
    nombrePeriodos: this.nombrePeriodos,
    cursos: this.cursos
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
  publicidad = new FormControl(new Number(), [Validators.required, Validators.min(0)]);
  cantidadVendedores = new FormControl(new Number(), [Validators.required, Validators.min(0)]);
  estadoInicialForm: FormGroup = new FormGroup({
    calidad: this.calidad,
    costoFijo: this.costoFijo,
    costoVariable: this.costoVariable,
    produccionMensual: this.produccionMensual,
    stock: this.stock,
    publicidad: this.publicidad,
    cantidadVendedores: this.cantidadVendedores
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

  porcentajeCaja = new FormControl('', [Validators.required]);
  porcentajeVentas = new FormControl('', [Validators.required]);
  porcentajeRenta = new FormControl('', [Validators.required]);
  porcentajeEscenario = new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]);

  puntajeForm: FormGroup = new FormGroup({
    porcentajeCaja: this.porcentajeCaja,
    porcentajeVentas: this.porcentajeVentas,
    porcentajeRenta: this.porcentajeRenta,
    porcentajeEscenario: this.porcentajeEscenario
  });

  hasProyectos = false;

  constructor(private escenariosService: EscenariosService,
    private route: ActivatedRoute,
    private router: Router,
    private cursosService: CursosService,
    private messageService: MessagesService) {

  }


  puntajes = {
    escenarioId: null,
    porcentajeCaja: 0,
    porcentajeVentas: 0,
    porcentajeRenta: 0,
    porcentajeEscenario: 0
  }

  @ViewChild('cursosInput', { static: false }) cursosInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  ngOnInit() {
    var id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getEscenario(id).subscribe(escenario => {
        this.escenario = escenario
        this.getConfiguracionMercado(escenario)
        this.getHasProyectos(escenario.id);
        this.escenariosService.getCursosEscenario(id).subscribe(cursosEscenario => {
          this.escenario.cursos = cursosEscenario;
        })
      });
      this.getPuntajes(id);
    }
    this.getCursos();
  }

  getHasProyectos(escenarioId){
    return this.escenariosService.getProyectosByEscenario(escenarioId).subscribe(proyectos => {
      this.hasProyectos = (proyectos.length > 0)
    })
  }

  getPuntajes(escenarioId) {
    this.escenariosService.getPuntajes(escenarioId).subscribe(puntajes => {
      if (puntajes) {
        this.puntajes = puntajes;
      } else {
        this.puntajes.escenarioId = escenarioId;
      }
    })
  }

  getCursos() {
    this.cursosService.getCursos().subscribe(cursos => {
      this.allCursos = cursos;
      this.filtredCursos = of(cursos);

      this.filtredCursos = this.cursos.valueChanges.pipe(
        startWith(null),
        map((curso: string | null) => {
          return curso ? this._filterCurso(curso) : this.allCursos.slice()
        }));

    })
  }

  selectedCurso(event: MatAutocompleteSelectedEvent) {
    this.escenario.cursos.push(
      event.option.value
    );
    this.cursosInput.nativeElement.value = '';
    this.cursos.setValue(null);
  }

  removeCurso(curso): void {
    const index = this.escenario.cursos.indexOf(curso);
    if (index >= 0) {
      this.escenario.cursos.splice(index, 1);
    }
  }

  private _filterCurso(value: string): string[] {
    if(value.toLowerCase){
      const filterValue = value.toLowerCase();
      return this.allCursos.filter(curso => curso.nombre.toLowerCase().indexOf(filterValue) === 0);
    }else{
      return this.allCursos;
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
    if (this.escenarioForm.valid && this.activoForm.valid && this.pasivoForm.valid && this.patrimonioNetoForm.valid
      && this.puntajeForm.valid) {
      if (this._porcentajesValidos()) {
        this.escenariosService[this.escenario.id ? 'modifyEscenario' : 'createEscenario'](this.escenario)
          .subscribe(escenario => {
            this.escenariosService.updateCursosEscenario(escenario.id, this.escenario.cursos).subscribe(_ => {
              this.escenariosService.postPuntajes(escenario.id, this.puntajes).subscribe(_ => {
                if (this.escenario.id) {
                  const error = this._getErroresConfiguracionesMercado();
                  if (error) {
                    this.messageService.openSnackBar(error)
                  } else {
                    this.escenariosService.postConfiguracionesMercado(this.configuracionMercado).subscribe(_ => {
                      this.messageService.openSnackBar("Escenario modificado");
                      this.router.navigate(['/escenarios'])
                    })
                  }
                } else {
                  this.messageService.openSnackBar("Escenario modificado");
                  this.router.navigate(['/escenarios/' + escenario.id])
                }
              })
            })
          });
      }
    } else {
      this.messageService.openSnackBar("ERROR: Revise los datos ingresados.");
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
          nombre: 'Empresa ' + index,
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

  _validateSecuencia(array, prop) {
    var arrayValor = array.map(elem => elem[prop]),
      arrayOrdernado = arrayValor.concat([]).sort((a, b) => a > b ? 1 : -1);
    if (JSON.stringify(arrayOrdernado) !== JSON.stringify(arrayValor)) {
      return "Revise las secuencias de valores en las configuraciones de mercado"
    }
    return true;
  }

  _validateObligatory(array, additionalProp) {
    return array.find(elem => {
      return (!(elem.bajo >= 0 && elem.medio >= 0 && elem.alto >= 0) ||
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
      this.configuracionMercado.restriccionPrecio.precioMin < this.configuracionMercado.restriccionPrecio.precioMax)
      ? true : "Ingrese un Intervalo de Precio valido"
  }

  _porcentajesValidos() {
    if (this.puntajes.porcentajeCaja + this.puntajes.porcentajeVentas + this.puntajes.porcentajeRenta !== 100) {
      this.messageService.openSnackBar("Puntajes: Los porcentajes ingresados para caja, renta y ventas deben sumar 100%")
      return false;
    }
    return true;
  }

}
