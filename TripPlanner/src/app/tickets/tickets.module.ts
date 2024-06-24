import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketLayoutComponent } from './ticket-layout/ticket-layout.component';
import { SharedModule } from 'src/shared/shared.module';
import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsListComponent } from './tickets-list/tickets-list.component';
import { TicketDialogComponent } from './ticket-dialog/ticket-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TicketLayoutComponent, TicketsListComponent, TicketDialogComponent],
  imports: [CommonModule, SharedModule, TicketsRoutingModule, ReactiveFormsModule],
})
export class TicketsModule {}
