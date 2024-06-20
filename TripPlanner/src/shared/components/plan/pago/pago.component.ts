import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { PagoDto, UsuarioDetalle, UsuarioDto } from 'src/shared/core/model/index';
import { PagoControllerService } from 'src/shared/core/api/pago-controller/pago-controller.service';
import { UsuarioControllerService } from 'src/shared/core/api/usuario-controller/usuario-controller.service';

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
    idViaje?: number;
    @Output() pagoChange = new EventEmitter<PagoDto>();

  // Lista de usuarios (debería ser reemplazada por datos reales)
  usuarios: UsuarioDetalle[] = [];

  constructor(private fb: FormBuilder,
    private _pagosController: PagoControllerService,
    private _usuariosController: UsuarioControllerService) 
   {
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

  loadForm(idPago: number | undefined, idViaje: number | undefined): void {
    /*
    if (!idPago) {
      return;
    }
    this._pagosController.getPago(idPago).subscribe(pago => {
      this.pagoForm.patchValue(pago, { emitEvent: false });
    });
    */
    this.idViaje = idViaje;
    if (this.idViaje) {
      this._usuariosController.findUsuarios({idViaje: this.idViaje}).subscribe(usuarios => {
        this.usuarios = usuarios;
      });
    }
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
