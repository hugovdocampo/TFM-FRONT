import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapPlanComponent } from './map-plan/map-plan.component';
import { MaprRoutingModule } from './map-routing.module';
import { NgxMapLibreGLModule } from '@maplibre/ngx-maplibre-gl';



@NgModule({
  declarations: [
    MapPlanComponent
  ],
  imports: [
    CommonModule,
    MaprRoutingModule,
    NgxMapLibreGLModule
  ]
})
export class MapModule { }
