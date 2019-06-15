import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimulationsComponent } from './simulations/simulations.component';
import { AwardsComponent } from './awards/awards.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'home', redirectTo: 'simulations' },
  { path: 'simulations', component: HomeComponent, 
                   children: [ { path: '',component: SimulationsComponent, pathMatch: 'full' }] },
  { path: 'awards', component: HomeComponent,
                  children: [ { path: '',component: AwardsComponent, pathMatch: 'full' }] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
