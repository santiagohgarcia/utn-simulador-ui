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
    cursos: [],
    invalid: null
  };

  descripcion = new FormControl('', [Validators.required]);
  titulo = new FormControl('', [Validators.required]);
  maximosPeriodos = new FormControl(new Number(), [Validators.required]);
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
    private cursosService: CursosService,
    private messageService: MessagesService) {

  }

  @ViewChild('cursosInput', { static: false }) cursosInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  ngOnInit() {
    var id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getEscenario(id).subscribe(escenario => this.escenario = escenario);
      this.escenariosService.getCursosEscenario(id).subscribe(cursosEscenario => {
        this.escenario.cursos = cursosEscenario;
      })
    }
    this.getCursos();
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
    const filterValue = value.toLowerCase();
    return this.allCursos.filter(curso => curso.nombre.toLowerCase().indexOf(filterValue) === 0);
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
          if (this.escenario.id) {
            this.escenariosService.updateCursosEscenario(this.escenario.id, this.escenario.cursos).subscribe(_ => {
              this.messageService.openSnackBar("Escenario modificado");
              this.router.navigate(['/escenarios'])
            })
          } else {
            this.messageService.openSnackBar("Escenario modificado");
            this.router.navigate(['/escenarios'])
          }
        });
    }
  }


}
