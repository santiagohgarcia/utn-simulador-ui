import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { ProveedoresService } from '../proveedores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from '../messages.service';
import { EscenariosService } from '../escenarios.service';

@Component({
  selector: 'app-proveedor-detail',
  templateUrl: './proveedor-detail.component.html',
  styleUrls: ['./proveedor-detail.component.css']
})
export class ProveedorDetailComponent implements OnInit {

  proveedor: any = {
    escenarioId: null,
    nombre: "",
    variacionCostoVariable: 0,
    variacionCalidad: 0,
    modalidadPago: [{
      porcentaje: 0,
      offsetPeriodo: 0
    }, {
      porcentaje: 0,
      offsetPeriodo: 1
    }, {
      porcentaje: 0,
      offsetPeriodo: 2
    }, {
      porcentaje: 0,
      offsetPeriodo: 3
    }]
  };

  nombre = new FormControl('', [Validators.required]);
  variacionCostoVariable = new FormControl('', [Validators.required]);
  variacionCalidad = new FormControl('', [Validators.required]);
  proveedorForm: FormGroup = new FormGroup({
    nombre: this.nombre,
    variacionCostoVariable: this.variacionCostoVariable,
    variacionCalidad: this.variacionCalidad
  });

  constructor(private proveedoresService: ProveedoresService, 
    private route: ActivatedRoute, 
    private router: Router,
    private messageService: MessagesService,
    private escenariosService: EscenariosService) { }

  ngOnInit() {
    var esenarioId = Number(this.route.snapshot.paramMap.get('escenarioId'));
    var id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.escenariosService.getProveedor(esenarioId, id).subscribe(p => {
        p.modalidadPago = this.proveedor.modalidadPago.map(mpt => {
          return { ...mpt, ...p.modalidadPago.find(mp => mp.offsetPeriodo === mpt.offsetPeriodo) };
        });
        this.proveedor = p;
        this.proveedor.escenarioId = esenarioId;
      });
    } else {
      this.proveedor.escenarioId = esenarioId;
    }
  }

  save() {
    if (this.proveedorForm.valid && this.inputsValidos()) {
      this.proveedoresService[this.proveedor.id ? 'modifyProveedor' : 'createProveedor'](this.proveedor)
      .subscribe(_ => {
        this.messageService.openSnackBar("Proveedor modificado");
        this.router.navigate([`/escenarios/${this.proveedor.escenarioId}`])
      })
    }
  }

  inputsValidos(){
    //Validar totales de modalidad de pago
    var modalidadPagoPorcentajeTotal = this.proveedor.modalidadPago.filter(elem => elem.porcentaje > 0)
      .reduce((acum, elem) => acum + elem.porcentaje, 0)
    if (modalidadPagoPorcentajeTotal !== 100) {
      this.messageService.openSnackBar("Los porcentajes en la modalidad de pago deben sumar 100%!");
      return false;
    }
    return true;
  }

}
