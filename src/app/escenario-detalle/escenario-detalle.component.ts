import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-escenario-detalle',
  templateUrl: './escenario-detalle.component.html',
  styleUrls: ['./escenario-detalle.component.css']
})
export class EscenarioDetalleComponent implements OnInit {
  escenario = {
    titulo: "El renegado del 2001",
    descripcion: `El Grupo Macri es uno de los grupos empresariales más importantes de la Argentina,2​ fundado por el magnate ítalo-argentino Franco Macri, padre del presidente argentino Mauricio Macri. El grupo posee empresas en Argentina, Brasil, Panamá y Uruguay.Las empresas que lo integran están relacionadas principalmente con las actividades de construcción, industria automotriz, correo, recolección de residuos e industria alimentaria.La facturación del grupo alcanzaba a 2.300 millones de dólares en 1999. Desde ahí en adelante se desconoce el origen y paradero de sus fondos, se cree que esa cifra se quintuplicó solo en el 2003.3​`,
    periodos: 5
  };
  descripcion = new FormControl('', [Validators.required]);
  titulo = new FormControl('', [Validators.required]);
  periodos = new FormControl('', [Validators.required]);
  escenarioForm: FormGroup = new FormGroup({
    descripcion: this.descripcion,
    titulo: this.titulo,
    periodos: this.periodos
  });

  constructor() { }

  ngOnInit() {
  }


  getPeriodosArray(){
    var periodos = Number(this.escenario.periodos);
    return [...Array(periodos).keys(),periodos];
  }

}
