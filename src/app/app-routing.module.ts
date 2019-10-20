import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PremiosComponent } from './premios/premios.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DecisionesComponent } from './decisiones/decisiones.component';
import { DecisionDetalleComponent } from './decision-detalle/decision-detalle.component';
import { FlujoFondosComponent } from './flujo-fondos/flujo-fondos.component';
import { TomaDecisionesComponent } from './toma-decisiones/toma-decisiones.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { EscenariosComponent } from './escenarios/escenarios.component';
import { EscenarioDetalleComponent } from './escenario-detalle/escenario-detalle.component';
import { SimulacionesComponent } from './simulaciones/simulaciones.component';
import { ProveedorDetailComponent } from './proveedor-detail/proveedor-detail.component';
import { EstadoJuegosComponent } from './estado-juegos/estado-juegos.component';
import { CursosComponent } from './cursos/cursos.component';
import { EstadoJuegoDetailComponent } from './estado-juego-detail/estado-juego-detail.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', redirectTo: 'simulaciones' },
  {
    path: 'simulaciones', component: HomeComponent,
    children: [{ path: '', component: SimulacionesComponent, pathMatch: 'full' }]
  },
  {
    path: 'simulaciones/escenario/:escenarioId/resultados', component: HomeComponent,
    children: [{ path: '', component: ResultadosComponent, pathMatch: 'full' }]
  },
  {
    path: 'premios', component: HomeComponent,
    children: [{ path: '', component: PremiosComponent, pathMatch: 'full' }]
  },
  {
    path: 'escenarios', component: HomeComponent,
    children: [{ path: '', component: EscenariosComponent, pathMatch: 'full' }]
  }, 
  {
    path: 'cursos', component: HomeComponent,
    children: [{ path: '', component: CursosComponent, pathMatch: 'full' }]
  },
  {
    path: 'estado-juegos', component: HomeComponent,
    children: [{ path: '', component: EstadoJuegosComponent, pathMatch: 'full' }]
  },
  {
    path: 'simulaciones/escenario/:escenarioId', component: HomeComponent,
    children: [{ path: '', component: TomaDecisionesComponent, pathMatch: 'full' }]
  },
  {
    path: 'estado-juego/curso/:cursoId/escenario/:escenarioId', component: HomeComponent,
    children: [{ path: '', component: EstadoJuegoDetailComponent, pathMatch: 'full' }]
  },
  { path: 'escenarios/:escenarioId/decisiones/new', component: DecisionDetalleComponent, pathMatch: 'full' },
  { path: 'escenarios/:escenarioId/decisiones/:id', component: DecisionDetalleComponent, pathMatch: 'full' },
  { path: 'escenarios/:escenarioId/proveedores/new', component: ProveedorDetailComponent, pathMatch: 'full' },
  { path: 'escenarios/:escenarioId/proveedores/:id', component: ProveedorDetailComponent, pathMatch: 'full' },
  { path: 'escenarios/new', component: EscenarioDetalleComponent, pathMatch: 'full' },
  { path: 'escenarios/:id', component: EscenarioDetalleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
