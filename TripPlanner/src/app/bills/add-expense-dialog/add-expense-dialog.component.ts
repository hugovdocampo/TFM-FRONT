import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PagoControllerService } from 'src/shared/core/api/pago-controller/pago-controller.service';
import { PagoRequest, UsuarioDto } from 'src/shared/core/model';

@Component({
  selector: 'app-add-expense-dialog',
  templateUrl: './add-expense-dialog.component.html',
  styleUrls: ['./add-expense-dialog.component.scss'],
})
export class AddExpenseDialogComponent {
  paidBy: string = '';
  paidTo: string[] = [];
  amount: number;
  description: string;

  constructor(
    public dialogRef: MatDialogRef<AddExpenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pagoService: PagoControllerService,
  ) {
    if (data.expense) {
      const payer = this.data.people.find((person: { fullName: any; }) => person.fullName === data.expense.paidBy);
      this.paidBy = payer ? payer.id.toString() : '';
      this.paidTo = data.expense.paidFor.split(', ').map((name: string) => {
        const user = this.data.people.find((person: UsuarioDto) => person.fullName === name);
        return user ? user.id.toString() : '';
      });
      this.amount = data.expense.amount;
      this.description = data.expense.title;
    } else {
      this.amount = 0;
      this.description = '';
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    const usuariosImplicados: UsuarioDto[] = this.paidTo.map((id) => {
      const user = this.data.people.find(
        (person: UsuarioDto) => person.id === Number(id),
      );
      return user
        ? user
        : {
            id: -1,
            fullName: 'Unknown',
            email: '',
            password: '',
            createdAt: new Date(),
            updatedAt: new Date(),
          };
    });

    const pagoRequest: PagoRequest = {
      idUsuario: Number(this.paidBy), 
      pagador: true, 
      pagoDto: {
        total: this.amount,
        descripcion: this.description,
        horario: {
          inicio: new Date().toISOString(),
          fin: new Date().toISOString(), 
        },
      },
      usuariosImplicados,
    };
    this.pagoService.createPago(pagoRequest).subscribe(() => {
      this.dialogRef.close();
    });
  }
}