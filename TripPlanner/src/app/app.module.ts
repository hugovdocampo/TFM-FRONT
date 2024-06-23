import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { BillsModule } from './bills/bills.module';
import { MenuModule } from './menu/menu.module';
import { SharedModule } from '../shared/shared.module';
import { CalendarModuleR } from './calendar/calendar.module';
import { MapModule } from './map/map.module';
import { TicketsModule } from './tickets/tickets.module';
import { ApiModule } from 'src/shared/core/api.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { ViajeModule } from './viaje/viaje.module';
import { JwtInterceptor } from 'src/shared/core/auth.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoaderInterceptor } from 'src/shared/core/loader.interceptor';
import { LoaderModule } from './loader/loader.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BillsModule,
    MenuModule,
    SharedModule,
    CalendarModuleR,
    MapModule,
    TicketsModule,
    HttpClientModule,
    ApiModule,
    ViajeModule,
    AuthComponent,
    MatSnackBarModule,
    LoaderModule
  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
