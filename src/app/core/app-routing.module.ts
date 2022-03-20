import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@core/auth.guard';

import { ApartmentComponent } from '@views/apartment/apartment.component';
import { FormComponent } from '@views/form/form.component';
import { LoginComponent } from '@views/login/login.component';
import { MapComponent } from '@views/map/map.component';
import { RegisterComponent } from '@views/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/map', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'map',
    component: MapComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'apartments/:pk',
    component: FormComponent,
    data: {title: 'Appartement'},
    canActivate: [AuthGuard]
  },
  {
    path: 'apartments',
    component: ApartmentComponent,
    data: {title: 'Appartements'},
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
