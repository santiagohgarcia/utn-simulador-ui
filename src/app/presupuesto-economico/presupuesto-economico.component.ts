import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-presupuesto-economico',
  templateUrl: './presupuesto-economico.component.html',
  styleUrls: ['./presupuesto-economico.component.css']
})
export class PresupuestoEconomicoComponent implements OnInit {
  @Input() proyecto: any;
  constructor() { }

  ngOnInit() {
  }

}
