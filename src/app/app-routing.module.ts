import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimulacionesComponent } from './simulaciones/simulaciones.component';
import { PremiosComponent } from './premios/premios.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DecisionesComponent } from './decisiones/decisiones.component';
import { DecisionDetalleComponent } from './decision-detalle/decision-detalle.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', redirectTo: 'simulaciones' },
  {
    path: 'simulaciones', component: HomeComponent,
    children: [{ path: '', component: SimulacionesComponent, pathMatch: 'full' }]
  },
  {
    path: 'premios', component: HomeComponent,
    children: [{ path: '', component: PremiosComponent, pathMatch: 'full' }]
  },
  {
    path: 'decisiones', component: HomeComponent,
    children: [{ path: '', component: DecisionesComponent, pathMatch: 'full' }]
  },
  { path: 'decisiones/new', component: DecisionDetalleComponent, pathMatch: 'full' },
  { path: 'decisiones/:id', component: DecisionDetalleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
