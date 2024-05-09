import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { SharedModule } from '../../shared/shared.module';
import { CalendarRoutingModule } from './calendar-routing.module';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { EventDialogComponent } from './event-dialog/event-dialog.component';

@NgModule({
  declarations: [CalendarComponent, EventDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    CalendarRoutingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
})
export class CalendarModuleR {}
