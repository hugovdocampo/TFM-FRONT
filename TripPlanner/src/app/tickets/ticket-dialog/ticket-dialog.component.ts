import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlanControllerService } from 'src/shared/core/api/plan-controller/plan-controller.service';
import { TicketControllerService } from 'src/shared/core/api/ticket-controller/ticket-controller.service';
import { UsuarioControllerService } from 'src/shared/core/api/usuario-controller/usuario-controller.service';
import { PlanDetalleDto, TicketRequest, TicketDto, HorarioDto } from 'src/shared/core/model';

@Component({
  selector: 'app-ticket-dialog',
  templateUrl: './ticket-dialog.component.html',
  styleUrls: ['./ticket-dialog.component.scss']
})
export class TicketDialogComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  ticketForm: FormGroup;
  planes: PlanDetalleDto[] = [];
  qrFile: string | ArrayBuffer | null = null;
  userId: number | null = null; 

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketControllerService,
    private planService: PlanControllerService,
    private userService: UsuarioControllerService,
    public dialogRef: MatDialogRef<TicketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.ticketForm = this.fb.group({
      nombre: ['', Validators.required],
      asiento: [''],
      qr: [''],
      categoria: ['', Validators.required],
      descripcion: [''],
      inicio: ['', Validators.required],
      fin: ['', Validators.required],
      idPlan: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.planService.findPlanesByIdViaje({ idViaje: this.data.travelId })
      .subscribe((planes: PlanDetalleDto[]) => {
        this.planes = planes;
      });

    const email = localStorage.getItem('userEmail');
    if (email) {
      this.userService.findUsuarioByEmail(email).subscribe((usuario) => {
        this.userId = usuario.id || null;
      });
    }
  }

  onFileChange(event: any): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.qrFile = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.ticketForm.valid && this.userId) { 
      const ticketDto: TicketDto = {
        nombre: this.ticketForm.get('nombre')?.value,
        asiento: this.ticketForm.get('asiento')?.value,
        qr: this.qrFile ? this.qrFile.toString() : '',
        categoria: this.ticketForm.get('categoria')?.value,
        descripcion: this.ticketForm.get('descripcion')?.value,
        idPlan: this.ticketForm.get('idPlan')?.value,
        horario: {
          inicio: this.ticketForm.get('inicio')?.value,
          fin: this.ticketForm.get('fin')?.value,
        } as HorarioDto
      };

      const ticketRequest: TicketRequest = {
        idUsuario: this.userId, 
        ticketDto: ticketDto
      };

      this.ticketService.createTicket(ticketRequest).subscribe(ticketId => {
        this.dialogRef.close(ticketId);
      });
    }
  }
}