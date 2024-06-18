import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketLayoutComponent } from './ticket-layout/ticket-layout.component';
import { SharedModule } from 'src/shared/shared.module';
import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsListComponent } from './tickets-list/tickets-list.component';

@NgModule({
  declarations: [TicketLayoutComponent, TicketsListComponent],
  imports: [CommonModule, SharedModule, TicketsRoutingModule],
})
export class TicketsModule {}
