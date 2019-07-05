import { Component, OnInit } from '@angular/core';
import { ProyectService } from '../proyect.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-decisions',
  templateUrl: './decisions.component.html',
  styleUrls: ['./decisions.component.css']
})
export class DecisionsComponent implements OnInit {

  decisions$: Observable<any>;

  constructor(private proyectService: ProyectService) { }

  ngOnInit() {
    this.getDecisions();
  }

  getDecisions() {
    this.decisions$ = this.proyectService.getDecisions();
  }

  removeDecision(id){
      this.proyectService.removeDecision(id);
  }

}
