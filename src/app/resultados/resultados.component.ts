import { Component, OnInit } from '@angular/core';
import { EscenariosService } from '../escenarios.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  escenario;

  constructor(private escenarioService: EscenariosService,  private route: ActivatedRoute) { }

  ngOnInit() {
    var escenarioId = Number(this.route.snapshot.paramMap.get('escenarioId'));
    this.getEscenario(escenarioId);
  }

  getEscenario(escenarioId){
    this.escenarioService.getEscenario(escenarioId).subscribe(escenario => this.escenario = escenario);
  }
}
