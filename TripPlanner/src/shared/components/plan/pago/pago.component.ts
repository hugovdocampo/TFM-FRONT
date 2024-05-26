import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { PagoDTO } from 'src/shared/core/model/pagoDTO.model';

@Component({
    selector: 'app-pago',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
    ],
    templateUrl: './pago.component.html',
    styleUrls: ['./pago.component.scss'],
})
export class PagoComponent { 

    pagoForm: FormGroup;
    @Output() pagoChange = new EventEmitter<PagoDTO>();

  // Lista de usuarios (debería ser reemplazada por datos reales)
  usuarios = [
    { id: 1, nombre: 'Usuario 1' },
    { id: 2, nombre: 'Usuario 2' },
    { id: 3, nombre: 'Usuario 3' },
    { id: 4, nombre: 'Usuario 4' }
  ];

  constructor(private fb: FormBuilder) {
    this.pagoForm = this.fb.group({
      total: [null, [Validators.pattern(/^[0-9]*(\.[0-9]{0,2})?$/), Validators.required]],
      idPagador: [null, Validators.required],
      idDeudores: [[], Validators.required]
    });

    this.pagoForm.valueChanges.subscribe(value => {
      if (this.pagoForm.valid) {
        this.pagoChange.emit(value);
      }
    });
  }

  onDeudoresChange(event: MatSelectChange): void {
    this.pagoForm.get('idDeudores')?.setValue(event.value);
    this.pagoForm.updateValueAndValidity();
  }

  loadForm(pago: PagoDTO | undefined): void {
    if (!pago) {
      return;
    }
    this.pagoForm.patchValue(pago, { emitEvent: false });
  }

  onTotalInput(event: any): void {
    let value = event.data.toString();

    if (value.includes('.') && value.split('.')[1].length > 2) {
        value = value.slice(0, -1);
        this.pagoForm.controls['total'].setValue(value);
    }
  }

  onKeyPress(event: KeyboardEvent): boolean {
    const inputChar = String.fromCharCode(event.keyCode);
    const pattern = /^[0-9]*(\.[0-9]{0,2})?$/;
    const currentValue = this.pagoForm.get('total')?.value || '';
    const newValue = currentValue + inputChar;

    if (!pattern.test(newValue)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

}
