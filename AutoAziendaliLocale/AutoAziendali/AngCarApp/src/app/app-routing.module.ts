import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { CarsComponent } from './modules/cars/cars.component';
import { StateComponent } from './modules/state/state.component';
import { ExpiryComponent } from './modules/expiry/expiry.component';
import { UtilizationComponent } from './modules/utilization/utilization.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'cars',
    component: CarsComponent
  },
  {
    path: 'state',
    component: StateComponent
  },
  {
    path: 'expiry',
    component: ExpiryComponent
  },
  {
    path: 'utilization',
    component: UtilizationComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routesComponents = [HomeComponent, CarsComponent,StateComponent,ExpiryComponent,UtilizationComponent]
