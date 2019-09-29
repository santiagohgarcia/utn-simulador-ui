import { Component, OnInit } from '@angular/core';
import { EscenariosService } from '../escenarios.service';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {
  proyecto;
  escenario;

  constructor(private escenarioService: EscenariosService, private route: ActivatedRoute, private usuarioService: UsuarioService) { }

  ngOnInit() {
    var escenarioId = Number(this.route.snapshot.paramMap.get('escenarioId'));
    this.getEscenario(escenarioId);
    this.getProyecto(escenarioId,this.usuarioService.usuario.id);
  }

  getProyecto(escenarioId, usuarioId) {
    this.usuarioService.getProyecto(escenarioId, usuarioId).subscribe(estado => {
      this.proyecto = estado.proyecto;
    })
  }

  getEscenario(escenarioId) {
    this.escenarioService.getEscenario(escenarioId).subscribe(escenario => this.escenario = escenario);
  }
}
