import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapPlanComponent } from './map-plan/map-plan.component';

const routes: Routes = [
  {
    path: '',
    component: MapPlanComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaprRoutingModule {}
