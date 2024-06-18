import { Component, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropuestaDto } from 'src/shared/core/model/index';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Observable, map } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-viaje-dialog',
  templateUrl: './viaje-dialog.component.html',
  styleUrls: ['./viaje-dialog.component.scss'],
})
export class ViajeDialogComponent {
  @ViewChild('stepper') stepper!: MatStepper;
  panelOpenState = false;

  stepperOrientation: Observable<StepperOrientation>;
  travelTitle: string = '';
  selectedUsers: string[] = [];
  userInput: string = '';
  propuestas: PropuestaDto[] = [];
  nuevaPropuesta: PropuestaDto = {
    id: 1,
    idViaje: 1,
    nombre: '',
    descripcion: '',
    presupuesto: 0,
    valoracion: 0,
  };

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  proposalForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ViajeDialogComponent>,
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver
  ) {
    this.initializeFormGroups();
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  initializeFormGroups(): void {
    this.firstFormGroup = this._formBuilder.group({
      travelTitle: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      participant: [''],
    });
    this.thirdFormGroup = this._formBuilder.group({});
    this.proposalForm = this._formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      presupuesto: [0, [Validators.required, Validators.min(0)]],
      valoracion: [
        0,
        [Validators.required, Validators.min(0), Validators.max(5)],
      ],
    });
  }

  addUser(): void {
    const participant = this.secondFormGroup.get('participant')?.value;
    if (participant) {
      this.selectedUsers.push(participant);
      this.secondFormGroup.get('participant')?.setValue('');
    }
  }

  removeUser(user: string): void {
    const index = this.selectedUsers.indexOf(user);
    if (index >= 0) {
      this.selectedUsers.splice(index, 1);
    }
  }

  addNewPropuesta(): void {
    if (this.proposalForm.valid) {
      const newProposal: PropuestaDto = this.proposalForm.value;
      this.propuestas.push(newProposal);
      this.proposalForm.reset({ presupuesto: 0, valoracion: 0 });
    }
    this.panelOpenState = false;
    console.log(this.panelOpenState);
  }

  onCreate(): void {
    this.dialogRef.close({
      title: this.firstFormGroup.get('travelTitle')?.value,
      users: this.selectedUsers,
      proposals: this.propuestas,
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  get isLastStep(): boolean {
    return this.stepper && this.stepper.selectedIndex === this.stepper._steps.length - 1;
  }
}
