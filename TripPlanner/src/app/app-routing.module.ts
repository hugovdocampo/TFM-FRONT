import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from '../shared/core/auth.guard'; 

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule), 
    canActivate: [AuthGuard]
  },
  {
    path: 'bills',
    loadChildren: () =>
      import('./bills/bills.module').then((m) => m.BillsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'calendar',
    loadChildren: () =>
      import('./calendar/calendar.module').then((m) => m.CalendarModuleR),
    canActivate: [AuthGuard]
  },
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then((m) => m.MapModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tickets',
    loadChildren: () =>
      import('./tickets/tickets.module').then((m) => m.TicketsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: 'signup',
    component: AuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
