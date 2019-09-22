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


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', redirectTo: 'toma-decisiones' },
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
    path: 'simulaciones', component: HomeComponent,
    children: [{ path: '', component: SimulacionesComponent, pathMatch: 'full' }]
  },
  {
    path: 'simulaciones/escenario/:escenarioId', component: HomeComponent,
    children: [{ path: '', component: TomaDecisionesComponent, pathMatch: 'full' }]
  },
  { path: 'escenarios/:escenarioId/decisiones/new', component: DecisionDetalleComponent, pathMatch: 'full' },
  { path: 'escenarios/:escenarioId/decisiones/:id', component: DecisionDetalleComponent },
  { path: 'escenarios/new', component: EscenarioDetalleComponent, pathMatch: 'full' },
  { path: 'escenarios/:id', component: EscenarioDetalleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
