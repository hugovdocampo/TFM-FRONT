import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketLayoutComponent } from './ticket-layout/ticket-layout.component';

const routes: Routes = [
  {
    path: '',
    component: TicketLayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketsRoutingModule{}
