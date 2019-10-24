import { Component, OnInit, Input } from '@angular/core';
import { ProyectoService } from "../proyecto.service";
import { Observable } from 'rxjs/Observable';
import * as Chart from 'chart.js';
import { UsuarioService } from '../usuario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit {
  @Input() proyecto: any;
  estadoActual: any;
  ultimoPrecioProducto;
  estados: any;
  cajaChartProps;
  ventasChartProps;
  modCobroChartProps;
  modPagoChartProps;
  escenario;

  constructor(private proyectoService: ProyectoService,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService) {
  }

  ngOnInit() {
    this.getEstadoActual(this.proyecto.id);
    this.getEstados(this.proyecto.id);
    this.getUltimoPrecioProducto(this.proyecto.id);
  }

  getUltimoPrecioProducto(proyectoId){
    this.proyectoService.getForecast(proyectoId).subscribe(forecasts => {
      this.ultimoPrecioProducto = forecasts.pop().precio;
    })

  }

  getEstadoActual(proyectoId) {
    this.estadoActual = this.proyectoService.getEstado(proyectoId).subscribe(estadoActual => {
      this.estadoActual = estadoActual;
      this.escenario = estadoActual.proyecto.escenario;
      this.setModCobroChartProps(estadoActual);
      this.setModPagoChartProps(estadoActual);
    })
  }

  getEstados(proyectoId) {
    this.proyectoService.getEstados(proyectoId).subscribe(estados => {
      this.estados = estados.filter(e => e.esForecast);
      this.setCajaChartProps(this.estados);
      this.setVentasChartProps(this.estados);
    })
  }

  setCajaChartProps(estados) {
    this.cajaChartProps = {
      options: {
        scaleShowVerticalLines: false,
        responsive: true
      },
      labels: estados.map(estado => `${this.escenario.nombrePeriodos} ${estado.periodo}`),
      type: 'line',
      legend: false,
      data: [
        { data: estados.map(estado => estado.caja), label: 'Caja' }
      ]
    }
  }

  setVentasChartProps(estados) {
    this.ventasChartProps = {
      options: {
        scaleShowVerticalLines: false,
        responsive: true
      },
      labels: estados.map(estado => `${this.escenario.nombrePeriodos} ${estado.periodo}`),
      type: 'line',
      legend: true,
      data: [
        {
          data: estados.map(estado => estado.ventas),
          fill: false,
          label: 'Ventas'
        },
        {
          data: estados.map(estado => estado.demandaPotencial),
          label: 'Demanda Potencial',
          fill: false,
          backgroundColor: 'rgb(75, 192, 192)',
          borderColor: 'rgb(75, 192, 192)',
          borderDash: [5, 5]
        }
      ]
    }
  }

  setModCobroChartProps(estadoActual) {
    this.modCobroChartProps = {
      options: {
        responsive: true,
        legend: {position: 'bottom'},
        aspectRatio: 1
      },
      labels: estadoActual.proyecto.modalidadCobro.filter(mc => mc.porcentaje > 0).map(modCobro => `${this.escenario.nombrePeriodos} ${modCobro.offsetPeriodo > 0 ? ' + ' + modCobro.offsetPeriodo : ''}`),
      type: 'pie',
      data: [
        { data: estadoActual.proyecto.modalidadCobro.filter(mc => mc.porcentaje > 0).map(modCobro => modCobro.porcentaje), label: 'Porcentaje' }
      ]
    }
  }

  setModPagoChartProps(estadoActual) {
    this.modPagoChartProps = {
      options: {
        responsive: true,
        legend: {position: 'bottom'},
        aspectRatio: 1
      },
      labels: estadoActual.proyecto.proveedorSeleccionado.modalidadPago.filter(mp => mp.porcentaje > 0).map(modPago => `${this.escenario.nombrePeriodos} ${modPago.offsetPeriodo > 0 ? ' + ' + modPago.offsetPeriodo : ''}`),
      type: 'pie',
      data: [
        { data: estadoActual.proyecto.proveedorSeleccionado.modalidadPago.filter(mp => mp.porcentaje > 0).map(modPago => modPago.porcentaje), label: 'Porcentaje' }
      ]
    }
  }

  getEvenNumber = function(num) {
    return Math.floor(Number(num)/2) > 0 ? new Array(Math.floor(Number(num)/2)) : 0;
  }

  getOddNumber = function(num) {
    return Number(num) % 2 != 0;
  }

}
