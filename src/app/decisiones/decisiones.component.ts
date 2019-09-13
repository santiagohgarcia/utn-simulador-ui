import { Component, OnInit, Input } from '@angular/core';
import { DecisionesService } from '../decisiones.service';


@Component({
  selector: 'app-decisiones',
  templateUrl: './decisiones.component.html',
  styleUrls: ['./decisiones.component.css']
})
export class DecisionesComponent implements OnInit {
  @Input() escenario: any;
  decisiones: Array<any>;

  constructor(private decisionesService: DecisionesService) { }

  ngOnInit() {
    this.getDecisiones();
  }

  getDecisiones() {
   this.decisionesService.getDecisiones(this.escenario.id).subscribe( decisiones => {
      this.decisiones = decisiones;
   });
  }

  removeDecision(id){
      this.decisionesService.removeDecision(id).subscribe(_ => this.getDecisiones());
  }



}
