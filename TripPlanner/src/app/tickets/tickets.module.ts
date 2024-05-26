import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketLayoutComponent } from './ticket-layout/ticket-layout.component';
import { SharedModule } from 'src/shared/shared.module';
import { TicketsRoutingModule } from './tickets-routing.module';

@NgModule({
  declarations: [TicketLayoutComponent],
  imports: [CommonModule, SharedModule, TicketsRoutingModule],
})
export class TicketsModule {}
