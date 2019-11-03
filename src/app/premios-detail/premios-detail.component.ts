import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EscenariosService } from '../escenarios.service';
import { MessagesService } from '../messages.service';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-premios-detail',
  templateUrl: './premios-detail.component.html',
  styleUrls: ['./premios-detail.component.css']
})
export class PremiosDetailComponent implements OnInit {

  escenario;
  curso;

  constructor(private route: ActivatedRoute,
    private escenariosService: EscenariosService,
    private usuarioService: UsuarioService,
    private messageService: MessagesService) { }

  ngOnInit() {
    const escenarioId = Number(this.route.snapshot.paramMap.get('escenarioId'));
    this.curso = this.usuarioService.usuario.curso;
    this.getEscenario(escenarioId);
  }

  getEscenario(escenarioId) {
    this.escenariosService.getEscenario(escenarioId).subscribe(escenario => {
      this.escenario = escenario
    })
  }
}
