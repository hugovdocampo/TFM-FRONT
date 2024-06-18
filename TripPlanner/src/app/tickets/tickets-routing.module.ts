import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketLayoutComponent } from './ticket-layout/ticket-layout.component';
import { TicketsListComponent } from './tickets-list/tickets-list.component';

const routes: Routes = [
  {
    path: '',
    component: TicketsListComponent,
  },
  {
    path: 'ticket/:id',
    component: TicketLayoutComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketsRoutingModule{}
