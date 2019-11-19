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
  @Input() forecast: boolean;
  estadoActual: any;
  ultimoPrecioProducto;
  estados: any;
  cajaChartProps;
  ventasChartProps;
  ventasVsStockChartProps;
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

  getUltimoPrecioProducto(proyectoId) {
    if (this.forecast) {
      this.proyectoService.getForecast(proyectoId).subscribe(forecasts => {
        this.ultimoPrecioProducto = forecasts.pop().precio;
      })
    } else {
      this.ultimoPrecioProducto = 0;
    }

  }

  getEstadoActual(proyectoId) {
    this.estadoActual = this.proyectoService.getEstado(proyectoId, this.forecast).subscribe(estadoActual => {
      this.estadoActual = estadoActual;
      this.escenario = estadoActual.proyecto.escenario;
    })
  }

  getEstados(proyectoId) {
    this.proyectoService.getEstados(proyectoId, this.forecast).subscribe(estados => {
      this.estados = estados;
      this.setCajaChartProps(this.estados);
      this.setVentasChartProps(this.estados);
      this.setStockVsVentasChartProps(this.estados);
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
        { data: estados.map(estado => estado.caja), label: 'Caja', fill: false }
      ]
    }
  }

  setVentasChartProps(estados) {
    this.ventasChartProps = {
      options: {
        scaleShowVerticalLines: false,
        responsive: true
      },
      labels: estados.filter((_, index) => index !== 0).map(estado => `${this.escenario.nombrePeriodos} ${estado.periodo}`),
      type: 'line',
      legend: true,
      data: [
        {
          data: estados.filter((_, index) => index !== 0).map(estado => estado.ventas),
          fill: false,
          label: 'Ventas'
        },
        {
          data: estados.filter((_, index) => index !== 0).map(estado => estado.demandaPotencial),
          label: 'Demanda obtenida',
          fill: false,
          backgroundColor: 'rgb(75, 192, 192)',
          borderColor: 'rgb(75, 192, 192)',
          borderDash: [5, 5]
        }
      ]
    }
  }

  setStockVsVentasChartProps(estados) {
    this.ventasVsStockChartProps = {
      options: {
        scaleShowVerticalLines: false,
        responsive: true,
        aspectRatio: 1.5
      },
      labels: estados.filter((_, index) => index !== 0).map(e => e.proyecto.escenario.nombrePeriodos + " " + e.periodo),
      type: 'bar',
      legend: true,
      data: [
        {
          data: estados.filter((_, index) => index !== 0).map(e => e.ventas),
          type: 'line',
          fill: false,
          label: 'Ventas'
        },
        {
          data: estados.filter((_, index) => index !== 0).map(e => e.stock),
          type: 'bar',
          label: 'Stock',
          fill: false
        }
      ]
    }

  }

  getEvenNumber = function (num) {
    return Math.floor(Number(num) / 2) > 0 ? new Array(Math.floor(Number(num) / 2)) :  new Array(0);
  }

  getOddNumber = function (num) {
    return Number(num) % 2 != 0;
  }

}
