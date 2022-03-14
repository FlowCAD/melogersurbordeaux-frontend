import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApartmentComponent } from '@views/apartment/apartment.component';
import { FormComponent } from '@views/form/form.component';
import { LoginComponent } from '@views/login/login.component';
import { MapComponent } from '@views/map/map.component';
import { RegisterComponent } from '@views/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/map', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'map', component: MapComponent },
  {
    path: 'apartments/:pk',
    component: ApartmentComponent,
    data: {title: 'Appartement'},
    // canDeactivate: [GenericRouteCanDeactivateGuard],
    // canActivate: [GenericRouteCanActivateGuard]
  },
  {
    path: 'apartments',
    component: ApartmentComponent,
    data: {title: 'Appartements'}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
