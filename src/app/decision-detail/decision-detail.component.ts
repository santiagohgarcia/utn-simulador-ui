import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ProyectService } from '../proyect.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-decision-detail',
  templateUrl: './decision-detail.component.html',
  styleUrls: ['./decision-detail.component.css']
})
export class DecisionDetailComponent implements OnInit {

  decision$: Observable<any>;

  decisionTemplate: {
    descripcion
  }

  saveFunction;

  description = new FormControl('', [Validators.required]);
  decisionForm: FormGroup = new FormGroup({
    description: this.description
  });

  constructor(private proyectService: ProyectService, private route: ActivatedRoute) { }

  ngOnInit() {
    var id = this.route.snapshot.paramMap.get('id');
    this.getDecision(id);
  }

  getDecision(id) {
    if (id) {
      this.decision$ = this.proyectService.getDecision(id);
    }else{

    }
  }



}
