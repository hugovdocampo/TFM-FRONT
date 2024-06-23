import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime } from 'rxjs';
import { HorarioDto } from 'src/shared/core/model/index';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.scss'],
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
  ],
  standalone: true,
})
export class HorarioComponent {
  @Input() initialHorario: HorarioDto | undefined = undefined;
  @Output() horarioChange: EventEmitter<HorarioDto> = new EventEmitter<HorarioDto>();

  horarioForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.horarioForm = this.fb.group({
      diaInicio: [null],
      horaInicio: [{ value: null, disabled: true }],
      diaFin: [{ value: null, disabled: true }],
      horaFin: [{ value: null, disabled: true }],
    });
  }

  createHorarioDtoFromForm(values: any): HorarioDto {
    try {
      const inicio = this.combineDateAndTime(values.diaInicio, values.horaInicio);
      const fin = this.combineDateAndTime(values.diaFin, values.horaFin);

      return {
        id: this.initialHorario?.id,
        inicio: inicio.toISOString(),
        fin: fin.toISOString(),
      } as HorarioDto;
    } catch (error) {
      console.error('Error creating HorarioDto from form values', error);
      return {
        id: this.initialHorario?.id,
        inicio: '',
        fin: '',
      } as HorarioDto;
    }
  }

  combineDateAndTime(date: Date, time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const combinedDate = new Date(date);
    combinedDate.setHours(hours, minutes);
    return combinedDate;
  }

  ngOnInit() {
    if (this.initialHorario) {
      this.loadForm(this.initialHorario);
    }

    this.horarioForm.valueChanges.pipe(debounceTime(300)).subscribe((values) => {
      this.updateFormState(values);
      if (this.horarioForm.valid) {
        this.horarioChange.emit(this.horarioForm.value);
      }
    });
  }

  updateFormState(values: any) {
    const diaInicio = values.diaInicio;
    const horaInicio = values.horaInicio;
    const diaFin = values.diaFin;
    const horaFin = values.horaFin;

    if (diaInicio) {
      if (this.horarioForm.get('horaInicio')?.disabled) {
        this.horarioForm.get('horaInicio')?.enable();
      }
      if (this.horarioForm.get('diaFin')?.disabled) {
        this.horarioForm.get('diaFin')?.enable();
      }

      if (!horaInicio) {
        this.horarioForm.controls['horaInicio']?.setValue('00:00', { emitEvent: false });
      }

      if (diaFin) {
        if (this.horarioForm.get('horaFin')?.disabled) {
          this.horarioForm.get('horaFin')?.enable();
        }
        if (!horaFin) {
          this.horarioForm.controls['horaFin']?.setValue('23:59', { emitEvent: false });
        }
      } else {
        this.horarioForm.get('horaFin')?.disable({ emitEvent: false });
      }
    } else {
      this.horarioForm.get('horaInicio')?.disable({ emitEvent: false });
      this.horarioForm.get('diaFin')?.disable({ emitEvent: false });
      this.horarioForm.get('horaFin')?.disable({ emitEvent: false });
    }

    if (
      diaInicio &&
      diaFin &&
      new Date(this.dateToString(diaInicio) + 'T' + (horaInicio ?? '00:00')) >
        new Date(this.dateToString(diaFin) + 'T' + (horaFin ?? '23:59'))
    ) {
      this.horarioForm.get('diaFin')?.setErrors({ invalid: true });
      this.horarioForm.get('horaFin')?.setErrors({ invalid: true });
    } else {
      this.horarioForm.get('diaFin')?.setErrors(null);
      this.horarioForm.get('horaFin')?.setErrors(null);
    }

    this.horarioChange.emit(this.horarioForm.value);
  }

  dateToString(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  loadForm(horario: HorarioDto | undefined) {
    if (horario) {
      const horarioFormatted = {
        diaInicio: horario.inicio ? new Date(horario.inicio) : null,
        horaInicio: horario.inicio ? this.extractTime(new Date(horario.inicio)) : null,
        diaFin: horario.fin ? new Date(horario.fin) : null,
        horaFin: horario.fin ? this.extractTime(new Date(horario.fin)) : null,
      };
      this.horarioForm.enable({ emitEvent: false });
      this.horarioForm.patchValue(horarioFormatted, { emitEvent: false });
    } else {
      this.horarioForm.reset();
    }
  }

  extractTime(date: Date): string {
    return date.toTimeString().split(' ')[0].substring(0, 5);
  }
}