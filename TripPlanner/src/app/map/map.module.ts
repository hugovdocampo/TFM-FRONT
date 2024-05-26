import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapPlanComponent } from './map-plan/map-plan.component';
import { MaprRoutingModule } from './map-routing.module';
import { NgxMapLibreGLModule } from '@maplibre/ngx-maplibre-gl';
import { MaterialModule } from 'src/shared/material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'src/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { PlanComponent } from 'src/shared/components/plan/plan.component';



@NgModule({
    declarations: [
        MapPlanComponent
    ],
    imports: [
        CommonModule,
        MaprRoutingModule,
        NgxMapLibreGLModule,
        MaterialModule,
        MatFormFieldModule,
        MatInputModule,
        SharedModule,
        FormsModule,
        PlanComponent
    ]
})
export class MapModule { }
