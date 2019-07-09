import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { ProyectoService } from '../proyecto.service';
import { ActivatedRoute } from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-decision-detalle',
  templateUrl: './decision-detalle.component.html',
  styleUrls: ['./decision-detalle.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class DecisionDetalleComponent implements OnInit {

  decision;

  templateDecision = {
    descripcion: "",
    respuestas: []
  };

  saveFunction;

  descripcion = new FormControl('', [Validators.required]);
  decisionForm: FormGroup = new FormGroup({
    descripcion: this.descripcion
  });

  displayedColumns: string[] = ['descripcion','edit'];

  constructor(private proyectoService: ProyectoService, private route: ActivatedRoute) { }

  ngOnInit() {
    var id = Number(this.route.snapshot.paramMap.get('id'));
    this.getDecision(id).subscribe(d => this.decision = d );
  }

  getDecision(id) {
    return id ? this.proyectoService.getDecision(id) : of(this.templateDecision);
  }

  addRespuesta(){
    this.decision.respuestas = this.decision.respuestas.concat([{
      descripcion: "nueva resp",
      consecuencias: []
    }]);
  }

  removeRespuesta(respuesta){
    var index = this.decision.respuestas.indexOf(respuesta);
    this.decision.respuestas.splice(index, 1)
    this.decision.respuestas = this.decision.respuestas.concat([]);
  }

  addConsecuencia(respuesta) {
    respuesta.consecuencias = respuesta.consecuencias.concat([{
      cuenta: "cuenta",
      valor: 10
    }])
  }

  removeConsecuencia(respuesta,consecuencia){
    var index = respuesta.consecuencias.indexOf(consecuencia);
    respuesta.consecuencias.splice(index, 1);
    respuesta.consecuencias = respuesta.consecuencias.concat([]);
  }



}
