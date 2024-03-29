import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@core/auth.guard';

import { ChartsComponent } from '@views/charts/charts.component';
import { FormComponent } from '@views/form/form.component';
import { ListComponent } from '@views/list/list.component';
import { LoginComponent } from '@views/login/login.component';
import { MapComponent } from '@views/map/map.component';
import { RegisterComponent } from '@views/register/register.component';
import { UpdateComponent } from '@views/update/update.component';

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'map',
    component: MapComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'list/:pk',
    component: FormComponent,
    data: {title: 'Appartement'},
    canActivate: [AuthGuard]
  },
  {
    path: 'list',
    component: ListComponent,
    data: {title: 'Appartements'},
    canActivate: [AuthGuard]
  },
  {
    path: 'charts',
    component: ChartsComponent,
    data: {title: 'Graphiques'},
    canActivate: [AuthGuard]
  },
  {
    path: 'update',
    component: UpdateComponent,
    data: {title: 'Mise à jour'},
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
