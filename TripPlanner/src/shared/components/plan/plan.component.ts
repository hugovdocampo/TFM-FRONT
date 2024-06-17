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
import { PlanDetalleDto } from 'src/shared/core/model/index';
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
    PagoComponent,
  ],
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss'],
})
export class PlanComponent implements AfterViewInit {
    
    @ViewChild('horario') horarioComponent!: HorarioComponent;
    @ViewChild('ubicacion') ubicacionComponent!: UbicacionComponent;
    @ViewChild('pago') pagoComponent!: PagoComponent;
    planForm: FormGroup;
    planDetalleDto: PlanDetalleDto | undefined;

  constructor(
    public dialogRef: MatDialogRef<PlanComponent>,
    @Inject(MAT_DIALOG_DATA) public plan: PlanDetalleDto | undefined,
    private fb: FormBuilder,
  ) {
    this.planDetalleDto = plan;

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
    this.horarioComponent.loadForm(this.planDetalleDto?.horario);
    this.ubicacionComponent.loadForm(this.planDetalleDto?.ubicacion);
    this.pagoComponent.loadForm(this.planDetalleDto?.idPago);
  }

  cancelar() {
    this.dialogRef.close();
  }

  guardar() {
    console.log();
  }

  saveChanges(data: any, tipo: string) {
    if (this.planDetalleDto) {
      if (tipo === 'horario') this.planDetalleDto.horario = data;
      if (tipo === 'ubicacion') this.planDetalleDto.ubicacion = data;
      //if (tipo === 'pago') this.planDetalleDto.pago = data;
      if (tipo === 'valoracion') this.planDetalleDto.importancia = data;
    }
  }
  
}
