import { Component, OnInit, Input } from '@angular/core';
import { EscenariosService } from '../escenarios.service';
import { ProveedoresService } from '../proveedores.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {
  @Input() escenario: any;
  proveedores;

  constructor(private escenariosService: EscenariosService, 
              private proveedoresService: ProveedoresService) { }

  ngOnInit() {
    this.getProveedores();
  }

  getProveedores() {
    this.escenariosService.getProveedores(this.escenario.id).subscribe(proveedores => {
      this.proveedores = proveedores;
    });
  }

  removeProveedor(proveedor) {
    this.proveedoresService.removeProveedor(proveedor).subscribe(_ => this.getProveedores());
  }

}
