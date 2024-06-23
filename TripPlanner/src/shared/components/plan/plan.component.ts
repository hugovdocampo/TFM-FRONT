import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HorarioComponent } from './horario/horario.component';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { HorarioDto, PlanDetalleDto } from 'src/shared/core/model/index';
import { UbicacionComponent } from './ubicacion/ubicacion.component';
import { PlanControllerService } from 'src/shared/core/api/plan-controller/plan-controller.service';
import { LocalStorageService } from 'src/app/menu/local-storage-service.service';
import { GeocodingService } from 'src/app/ubicacion/geocoding-service.service';

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
  ],
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss'],
})
export class PlanComponent implements AfterViewInit {
  @ViewChild('horario') horarioComponent!: HorarioComponent;
  @ViewChild('ubicacion') ubicacionComponent!: UbicacionComponent;
  planForm: FormGroup;
  planDetalleDto: PlanDetalleDto | undefined;
  importancia: number = 0;

  constructor(
    public dialogRef: MatDialogRef<PlanComponent>,
    @Inject(MAT_DIALOG_DATA) public plan: PlanDetalleDto | undefined,
    private fb: FormBuilder,
    private _planService: PlanControllerService,
    private cdr: ChangeDetectorRef,
    private localStorageService: LocalStorageService,
    private geocodingService: GeocodingService,
  ) {
    this.planDetalleDto = plan;

    this.planForm = this.fb.group({
      nombre: [{ value: null }],
      descripcion: [{ value: null }],
      importancia: [0],
    });

    if (plan) {
      this.planForm.controls['nombre'].setValue(plan.nombre);
      this.planForm.controls['descripcion'].setValue(plan.descripcion);
      this.planForm.controls['importancia'].setValue(plan.importancia);
      this.importancia = plan.importancia || 0;
    }
  }

  ngAfterViewInit() {
    if (this.planDetalleDto) {
      setTimeout(() => {
        this.horarioComponent.loadForm(this.planDetalleDto?.horario);
        this.ubicacionComponent.loadForm(this.planDetalleDto?.ubicacion);
        this.cdr.detectChanges();
      }, 0);
    }
  }

  cancelar() {
    this.dialogRef.close();
  }

  guardar() {
    if (this.planForm.invalid) {
      console.error('Formulario inválido', this.planForm.errors);
      return;
    }

    const ubicacion = this.ubicacionComponent.ubicacionForm.value;
    this.geocodingService
      .getCoordinates(ubicacion.direccion)
      .then((coordinates) => {
        const horarioDto: HorarioDto =
          this.horarioComponent.createHorarioDtoFromForm(
            this.horarioComponent.horarioForm.value,
          );
        const idViaje = Number(this.localStorageService.getItem('travelId'));
        if (this.planDetalleDto?.id) {
          this.planDetalleDto.idViaje = idViaje;
          this.planDetalleDto.nombre = this.planForm.controls['nombre'].value;
          this.planDetalleDto.descripcion =
            this.planForm.controls['descripcion'].value;
          this.planDetalleDto.importancia =
            this.planForm.controls['importancia'].value;
          this.planDetalleDto.horario = horarioDto;
          this.planDetalleDto.ubicacion = {
            ...this.ubicacionComponent.ubicacionForm.value,
            coordenadas: `${coordinates.lon},${coordinates.lat}`,
          };
          this._planService
            .updatePlan(this.planDetalleDto.id, this.planDetalleDto)
            .subscribe(
              (response) => {
                console.log('Plan actualizado con éxito', response);
                this.dialogRef.close(response);
              },
              (error) => {
                console.error('Error al actualizar el plan', error);
              },
            );
        } else {
          console.log(horarioDto);
          const plan = {
            idViaje: idViaje,
            nombre: this.planForm.controls['nombre'].value,
            descripcion: this.planForm.controls['descripcion'].value,
            importancia: this.planForm.controls['importancia'].value,

            horario: horarioDto,
            ubicacion: {
              ...this.ubicacionComponent.ubicacionForm.value,
              coordenadas: `${coordinates.lon},${coordinates.lat}`,
            },
          };

          this._planService.createPlan(plan).subscribe(
            (response) => {
              console.log('Plan creado con éxito', response);
              this.dialogRef.close(response);
            },
            (error) => {
              console.error('Error al crear el plan', error);
            },
          );
        }
      });
  }

  saveChanges(data: any, tipo: string) {
    if (this.planDetalleDto) {
      if (tipo === 'horario') this.planDetalleDto.horario = data;
      if (tipo === 'ubicacion') this.planDetalleDto.ubicacion = data;
      if (tipo === 'importancia')
        this.planForm.controls['importancia'].setValue(data);
    } else {
      console.error('planDetalleDto is undefined');
    }
  }

  borrar() {
    if (this.planDetalleDto?.id) {
      this._planService.deletePlan(this.planDetalleDto.id).subscribe(
        (response) => {
          console.log('Plan borrado con éxito', response);
          this.dialogRef.close({ deleted: true });
        },
        (error) => {
          console.error('Error al borrar el plan', error);
        },
      );
    } else {
      console.error('No se puede borrar un plan sin ID');
    }
  }
}
