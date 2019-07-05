import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ProyectoService } from '../proyecto.service';
import { ActivatedRoute } from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];



@Component({
  selector: 'app-decision-detalle',
  templateUrl: './decision-detalle.component.html',
  styleUrls: ['./decision-detalle.component.css']
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

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  constructor(private proyectoService: ProyectoService, private route: ActivatedRoute) { }

  ngOnInit() {
    var id = Number(this.route.snapshot.paramMap.get('id'));
    this.getDecision(id).subscribe(d => this.decision = d );
  }

  getDecision(id) {
    return id ? this.proyectoService.getDecision(id) : Observable.of(this.templateDecision);
  }

  addRespuesta(){
    this.decision.respuestas.push({
      descripcion: "nueva resp"
    })
  }

  removeRespuesta(id){
    var index = this.decision.respuestas.indexOf(this.decision.respuestas.find(r => r.id === id ));
    this.decision.respuestas.splice(index, 1);
  }



}
