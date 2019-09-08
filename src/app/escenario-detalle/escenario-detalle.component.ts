import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectoService } from '../proyecto.service';

@Component({
  selector: 'app-escenario-detalle',
  templateUrl: './escenario-detalle.component.html',
  styleUrls: ['./escenario-detalle.component.css']
})
export class EscenarioDetalleComponent implements OnInit {
  escenario = {
    id: null,
    titulo: '',
    periodos: null,
    descripcion: '',
    impuestoPorcentaje: null
  };
  descripcion = new FormControl('', [Validators.required]);
  titulo = new FormControl('', [Validators.required]);
  periodos = new FormControl(new Number(), [Validators.required]);
  impuestoPorcentaje = new FormControl(new Number(), [Validators.required, Validators.min(0), Validators.max(99.9)]);
  escenarioForm: FormGroup = new FormGroup({
    descripcion: this.descripcion,
    titulo: this.titulo,
    periodos: this.periodos
  });

  constructor(private proyectoService: ProyectoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    var id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getEscenario(id).subscribe(escenario => this.escenario = escenario);
    }
  }

  getEscenario(id) {
    return this.proyectoService.getEscenario(id);
  }

  getPeriodosArray() {
    var periodos = Number(this.escenario.periodos);
    return [...Array(periodos).keys(), periodos];
  }

  save() {
    if (this.escenarioForm.valid) {
      this.proyectoService[this.escenario.id ? 'modifyEscenario' : 'createEscenario'](this.escenario)
        .subscribe(_ => this.router.navigate(['/escenarios']));
    }
  }


}
