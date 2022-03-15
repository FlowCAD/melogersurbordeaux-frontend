import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { MaterialModule } from './material.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AuthService } from '@core/auth.service';
import { TopbarComponent } from '@core/topbar/topbar.component';

import { ApartmentComponent } from '@views/apartment/apartment.component';
import { FormComponent } from '@views/form/form.component';
import { LoginComponent } from '@views/login/login.component';
import { MapComponent } from '@views/map/map.component';
import { RegisterComponent } from '@views/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    // Core
    TopbarComponent,
    // Views
    ApartmentComponent,
    FormComponent,
    LoginComponent,
    MapComponent,
    RegisterComponent,
  ],
  imports: [
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    AppRoutingModule,
    MaterialModule,
    LeafletModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
