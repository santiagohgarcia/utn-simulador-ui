import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ProyectoService } from '../proyecto.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-decision-detalle',
  templateUrl: './decision-detalle.component.html',
  styleUrls: ['./decision-detalle.component.css']
})
export class DecisionDetalleComponent implements OnInit {

  decision$: Observable<any>;

  saveFunction;

  descripcion = new FormControl('', [Validators.required]);
  decisionForm: FormGroup = new FormGroup({
    descripcion: this.descripcion
  });

  constructor(private proyectoService: ProyectoService, private route: ActivatedRoute) { }

  ngOnInit() {
    var id = this.route.snapshot.paramMap.get('id');
    this.getDecision(id);
  }

  getDecision(id) {
    if (id) {
      this.decision$ = this.proyectoService.getDecision(id);
    }else{

    }
  }



}
