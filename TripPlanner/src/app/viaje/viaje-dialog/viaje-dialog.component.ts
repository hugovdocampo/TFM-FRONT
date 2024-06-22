import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropuestaDto } from 'src/shared/core/model/index';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Observable, map } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatStepper } from '@angular/material/stepper';
import { ViajeControllerService } from 'src/shared/core/api/viaje-controller/viaje-controller.service';
import { ImageApiControllerService } from 'src/shared/core/api/image-api-controller/image-api-controller.service';

@Component({
  selector: 'app-viaje-dialog',
  templateUrl: './viaje-dialog.component.html',
  styleUrls: ['./viaje-dialog.component.scss'],
})
export class ViajeDialogComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;
  steps: any[] = [];

  isEditingProposal: boolean = false;
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
    breakpointObserver: BreakpointObserver,
    private _viajeController: ViajeControllerService,
    private imageService: ImageApiControllerService,
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any,
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
      nombre: ['', Validators.required],
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
    this.isEditingProposal = false;
  }

  onCreate(): void {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      if (this.data.travelId) {
        this._viajeController
          .updateViaje(this.data.travelId, {
            titulo: this.firstFormGroup.get('travelTitle')?.value,
            fechaFin: this.firstFormGroup.get('endDate')?.value,
            fechaInicio: this.firstFormGroup.get('startDate')?.value,
            userEmail: userEmail,
            emailParticipantes: this.selectedUsers,
            propuestas: this.propuestas,
          })
          .subscribe((response: any) => {
            this.dialogRef.close({
              title: this.firstFormGroup.get('travelTitle')?.value,
              users: this.selectedUsers,
              proposals: this.propuestas,
            });
          });
      } else {
        this.imageService.getRandomImage('travel').subscribe((result: any) => {
          this._viajeController
            .createViaje({
              titulo: this.firstFormGroup.get('travelTitle')?.value,
              fechaFin: this.firstFormGroup.get('endDate')?.value,
              fechaInicio: this.firstFormGroup.get('startDate')?.value,
              userEmail: userEmail,
              emailParticipantes: this.selectedUsers,
              propuestas: this.propuestas,
              imagen: result.imageUrl,
            })
            .subscribe((response: any) => {
              this.dialogRef.close({
                title: this.firstFormGroup.get('travelTitle')?.value,
                users: this.selectedUsers,
                proposals: this.propuestas,
              });
            });
        });
      }
    }
  }

  onSave(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  get isLastStep(): boolean {
    return (
      this.stepper &&
      this.stepper.selectedIndex === this.stepper._steps.length - 1
    );
  }

  ngOnInit(): void {
    if (this.data.travelId) {
      this.loadViajeData(this.data.travelId);
    }
  }

  ngAfterViewInit(): void {
    this.updateSteps();
    this.stepper.selectionChange.subscribe(() => this.updateSteps());
    this.cd.detectChanges();
  }

  updateSteps(): void {
    this.steps = this.stepper.steps.toArray();
    this.cd.detectChanges();
  }

  loadViajeData(travelId: number): void {
    const userEmail = localStorage.getItem('userEmail');

    this._viajeController.getViaje(travelId).subscribe((viaje) => {
      this.firstFormGroup.patchValue({
        travelTitle: viaje.titulo,
        startDate: viaje.horario?.inicio,
        endDate: viaje.horario?.fin,
      });
      this.selectedUsers = viaje.emailParticipantes || [];
      this.propuestas = viaje.propuestas || [];
      this.selectedUsers = this.selectedUsers.filter(
        (user) => user !== userEmail,
      );
    });
  }

  editPropuesta(index: number): void {
    this.isEditingProposal = true;
    const proposal = this.propuestas[index];
    this.proposalForm.setValue({
      nombre: proposal.nombre,
      descripcion: proposal.descripcion,
      presupuesto: proposal.presupuesto,
      valoracion: proposal.valoracion
    });
    this.propuestas.splice(index, 1);
  }

  deletePropuesta(index: number): void {
    this.propuestas.splice(index, 1);
  }
}
