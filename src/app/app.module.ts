import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppRoutingModule } from '@core/app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { MaterialModule } from './material.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgxEchartsModule } from 'ngx-echarts';

import { AuthGuard } from '@core/auth.guard';

import { TopbarComponent } from '@core/components/topbar/topbar.component';
import { AuthService } from '@core/services/auth.service';
import { ApartService } from '@core/services/apart.service';
import { CryptoService } from '@core/services/crypto.service';
import { MapService } from '@core/services/map.service';
import { TokenInterceptorService } from '@core/services/token-interceptor.service'

import { ChartsComponent } from '@views/charts/charts.component';
import { FormComponent } from '@views/form/form.component';
import { FormCommentDialogComponent } from '@views/form/form-comment-dialog.component';
import { FormMapDialogComponent } from '@views/form/form-map-dialog.component';
import { ListComponent } from '@views/list/list.component';
import { LoginComponent } from '@views/login/login.component';
import { MapComponent } from '@views/map/map.component';
import { RegisterComponent } from '@views/register/register.component';
import { UpdateComponent } from '@views/update/update.component';

/** Import French local Id */
import { DatePipe, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    // Core
    TopbarComponent,
    // Views
    ChartsComponent,
    FormComponent,
    FormCommentDialogComponent,
    FormMapDialogComponent,
    ListComponent,
    LoginComponent,
    MapComponent,
    RegisterComponent,
    UpdateComponent
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
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
  ],
  providers: [
    AuthGuard,
    AuthService,
    ApartService,
    CryptoService,
    DatePipe,
    MapService,
    { provide: LOCALE_ID, useValue: 'fr' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
