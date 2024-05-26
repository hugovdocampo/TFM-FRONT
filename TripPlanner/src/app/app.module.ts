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
    TicketsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
