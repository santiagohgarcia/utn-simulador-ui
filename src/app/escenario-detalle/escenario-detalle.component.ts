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
    descripcion: '',
    impuestoPorcentaje: null
  };
  descripcion = new FormControl('', [Validators.required]);
  titulo = new FormControl('', [Validators.required]);
  maximosPeriodos = new FormControl(new Number(), [Validators.required]);
  impuestoPorcentaje = new FormControl(new Number(), [Validators.required, Validators.min(0), Validators.max(99.9)]);
  escenarioForm: FormGroup = new FormGroup({
    descripcion: this.descripcion,
    titulo: this.titulo,
    maximosPeriodos: this.maximosPeriodos
  });

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
    if (this.escenarioForm.valid) {
      this.escenariosService[this.escenario.id ? 'modifyEscenario' : 'createEscenario'](this.escenario)
        .subscribe(_ => {
          this.messageService.openSnackBar("Escenario modificado");
          this.router.navigate(['/escenarios'])
        });
    }
  }


}
