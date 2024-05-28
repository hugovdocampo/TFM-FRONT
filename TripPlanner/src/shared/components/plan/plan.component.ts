import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HorarioComponent } from './horario/horario.component';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { PlanDetalleDTO } from 'src/shared/core/model/planDetalleDTO.model';
import { UbicacionComponent } from './ubicacion/ubicacion.component';
import { PagoComponent } from './pago/pago.component';

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    StarRatingComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    HorarioComponent,
    MatIconModule,
    ReactiveFormsModule,
    UbicacionComponent,
    PagoComponent
  ],
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss'],
})
export class PlanComponent implements AfterViewInit {
    
    @ViewChild('horario') horarioComponent!: HorarioComponent;
    @ViewChild('ubicacion') ubicacionComponent!: UbicacionComponent;
    @ViewChild('pago') pagoComponent!: PagoComponent;
    planForm: FormGroup;
    planDetalleDTO: PlanDetalleDTO | undefined;

  constructor(
    public dialogRef: MatDialogRef<PlanComponent>,
    @Inject(MAT_DIALOG_DATA) public plan: PlanDetalleDTO | undefined,
    private fb: FormBuilder
  ) {
    this.planDetalleDTO = plan;

    this.planForm = this.fb.group({
        nombre: [{ value: null }],
        descripcion: [{ value: null }],
      });

    if (plan) {
        this.planForm.controls['nombre'].setValue(plan.nombre);
        this.planForm.controls['descripcion'].setValue(plan.descripcion);
    } 
  }

  ngAfterViewInit() {
    this.horarioComponent.loadForm(this.planDetalleDTO?.horario);
    this.ubicacionComponent.loadForm(this.planDetalleDTO?.ubicacion);
    this.pagoComponent.loadForm(this.planDetalleDTO?.pago);
  }

  cancelar() {
    this.dialogRef.close();
  }

  guardar() {
    console.log();
  }

  saveChanges(data: any, tipo: string) {
    if (this.planDetalleDTO) {
      if (tipo === 'horario') this.planDetalleDTO.horario = data;
      if (tipo === 'ubicacion') this.planDetalleDTO.ubicacion = data;
      if (tipo === 'pago') this.planDetalleDTO.pago = data;
      if (tipo === 'valoracion') this.planDetalleDTO.valoracion = data;
    }
  }
  
}
