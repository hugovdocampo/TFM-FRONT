import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime } from 'rxjs';
import { HorarioDTO } from 'src/shared/core/model/horarioDTO.model';

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
  @Input() initialHorario: HorarioDTO | undefined = undefined;
  @Output() horarioChange: EventEmitter<HorarioDTO> = new EventEmitter<HorarioDTO>();

  horarioForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.horarioForm = this.fb.group({
      diaInicio: [null],
      horaInicio: [{ value: null, disabled: true }],
      diaFin: [{ value: null, disabled: true }],
      horaFin: [{ value: null, disabled: true }],
    });
  }

  ngOnInit() {
    if (this.initialHorario) {
      this.horarioForm.setValue(this.initialHorario);
    }

    this.horarioForm.valueChanges
      .pipe(debounceTime(300))
      .subscribe((values) => {
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
        this.horarioForm.controls['horaInicio']?.setValue('00:00', {
          emitEvent: false,
        });
      }

      if (diaFin) {
        if (this.horarioForm.get('horaFin')?.disabled) {
          this.horarioForm.get('horaFin')?.enable();
        }
        if (!horaFin) {
          this.horarioForm.controls['horaFin']?.setValue('23:59', {
            emitEvent: false,
          });
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
      new Date(this.dateToSring(diaInicio) + 'T' + (horaInicio ?? '00:00')) >
        new Date(this.dateToSring(diaFin) + 'T' + (horaFin ?? '23:59'))
    ) {
      this.horarioForm.get('diaFin')?.setErrors({ invalid: true });
      this.horarioForm.get('horaFin')?.setErrors({ invalid: true });
    } else {
      this.horarioForm.get('diaFin')?.setErrors(null);
      this.horarioForm.get('horaFin')?.setErrors(null);
    }

    this.horarioChange.emit(this.horarioForm.value);
  }

  dateToSring(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  loadForm(horario: HorarioDTO | undefined) {
    if (horario) {
      let horarioFormatted = {
        diaInicio: horario.diaInicio ? new Date(horario.diaInicio) : null,
        horaInicio: horario.horaInicio,
        diaFin: horario.diaFin ? new Date(horario.diaFin) : null,
        horaFin: horario.horaFin,
      };
      this.horarioForm.enable({ emitEvent: false });
      this.horarioForm.patchValue(horarioFormatted, { emitEvent: false });
    } else {
      this.horarioForm.reset();
    }
  }
}
