import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddExpenseDialogComponent } from '../add-expense-dialog/add-expense-dialog.component';
import { PagoControllerService } from 'src/shared/core/api/pago-controller/pago-controller.service';
import { PagoDetalleDto, UsuarioDto } from 'src/shared/core/model';
import { UsuarioControllerService } from 'src/shared/core/api/usuario-controller/usuario-controller.service';

@Component({
  selector: 'app-bills-dashboard',
  templateUrl: './bills-dashboard.component.html',
  styleUrls: ['./bills-dashboard.component.scss'],
})
export class BillsDashboardComponent implements OnInit {
  showLabels: boolean = window.innerWidth > 600;

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: number } }) {
    this.showLabels = event.target.innerWidth > 600;
  }

  people: { name: string; balance: number | string }[] = [];
  transactions: { debtor: string; creditor: string; amount: number }[] = [];
  budgetData: { name: string; value: number }[] = [];
  totalBudget: number = 1000;
  spentAmount: number = 0;
  availableAmount: number = 0;
  daysLeft: number = 30;
  chartData: { name: string; value: number }[] = [];
  customColors: { name: string; value: string }[] = [];
  customColors2: { name: string; value: string }[] = [];
  displayedColumns: string[] = ['debtor', 'creditor', 'amount'];
  expenses: {
    id: number;
    title: string;
    amount: number;
    paidBy: string;
    date: Date;
    paidFor: string;
  }[] = [];
  allUsers: UsuarioDto[] = [];

  constructor(
    public dialog: MatDialog,
    private pagoService: PagoControllerService,
    private usuarioService: UsuarioControllerService,
  ) {}

  ngOnInit(): void {
    this.loadUsuarios();
    this.calculateDaysLeft();
  }

  calculateDaysLeft(): void {
    const today = new Date();
    const lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0,
    );
    this.daysLeft = Math.floor(
      (lastDayOfMonth.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );
  }

  loadUsuarios(): void {
    const viajeId = Number(localStorage.getItem('travelId'));
    this.usuarioService.getUsuariosByIdViaje(viajeId).subscribe((usuarios) => {
      this.allUsers = usuarios;
      this.loadPagos();
    });
  }

  loadPagos(): void {
    const viajeId = Number(localStorage.getItem('travelId'));
    this.pagoService.getPagosByIdViaje(viajeId).subscribe((pagos) => {
      this.processPagos(pagos);
    });
  }

  processPagos(pagos: PagoDetalleDto[]): void {
    const uniqueExpenses = new Map<number, any>();
    const balances: { [key: string]: number } = {};
    this.transactions = [];

    // Initialize balances for all users
    this.allUsers.forEach((user) => {
      if (user.fullName) {
        balances[user.fullName] = 0;
      }
    });

    pagos.forEach((pago) => {
      if (pago.id && !uniqueExpenses.has(pago.id)) {
        const pagador = pago.usuarios?.find(
          (u) => u.id === pago.idPagador,
        )?.fullName;
        const deudores =
          pago.usuarios?.filter((u) => u.pagador === false) || [];

        if (pagador && deudores.length > 0) {
          uniqueExpenses.set(pago.id, {
            id: pago.id,
            title: pago.descripcion ?? 'No description',
            amount: pago.total ?? 0,
            paidBy: pagador,
            date: new Date(pago.horario?.inicio ?? Date.now()),
            paidFor: deudores.map((u) => u.fullName).join(', '),
          });

          const amountPerUser = (pago.total ?? 0) / deudores.length;
          deudores.forEach((u) => {
            if (u.fullName) {
              balances[pagador] += amountPerUser;
              balances[u.fullName] -= amountPerUser;
              this.transactions.push({
                debtor: u.fullName,
                creditor: pagador,
                amount: amountPerUser,
              });
            }
          });
        }
      }
    });

    this.expenses = Array.from(uniqueExpenses.values());

    this.simplifyTransactions(balances);

    this.updateChartData(balances);

    this.spentAmount = this.transactions.reduce(
      (sum, item) => sum + item.amount,
      0,
    );
    this.availableAmount = this.totalBudget - this.spentAmount;

    this.budgetData = [
      { name: 'Disponible', value: this.availableAmount },
      { name: 'Gastado', value: this.spentAmount },
    ];

    this.customColors2 = this.budgetData.map((item) => ({
      name: item.name,
      value: item.name === 'Disponible' ? '#009fb7' : '#fed766ff',
    }));
  }

  simplifyTransactions(balances: { [key: string]: number }): void {
    const creditors = Object.keys(balances)
      .filter((key) => balances[key] > 0)
      .map((key) => ({ name: key, amount: balances[key] }));
    const debtors = Object.keys(balances)
      .filter((key) => balances[key] < 0)
      .map((key) => ({ name: key, amount: -balances[key] }));

    const newTransactions: {
      debtor: string;
      creditor: string;
      amount: number;
    }[] = [];

    creditors.sort((a, b) => b.amount - a.amount);
    debtors.sort((a, b) => b.amount - a.amount);

    while (creditors.length > 0 && debtors.length > 0) {
      const creditor = creditors[0];
      const debtor = debtors[0];
      const amount = Math.min(creditor.amount, debtor.amount);

      newTransactions.push({
        debtor: debtor.name,
        creditor: creditor.name,
        amount,
      });

      creditor.amount -= amount;
      debtor.amount -= amount;

      if (creditor.amount === 0) {
        creditors.shift();
      }
      if (debtor.amount === 0) {
        debtors.shift();
      }
    }

    this.transactions = newTransactions;

    // Update the balances based on simplified transactions
    Object.keys(balances).forEach((key) => (balances[key] = 0));
    newTransactions.forEach((transaction) => {
      balances[transaction.creditor] += transaction.amount;
      balances[transaction.debtor] -= transaction.amount;
    });

    this.updateChartData(balances);
  }

  updateChartData(balances: { [key: string]: number }): void {
    this.people = this.allUsers.map((user) => {
      const balance =
        user.fullName && balances[user.fullName] !== undefined
          ? balances[user.fullName]
          : '-';
      return {
        name: user.fullName ?? 'Unknown',
        balance: balance,
      };
    });

    this.chartData = this.people.map((person) => ({
      name: person.name,
      value: typeof person.balance === 'number' ? person.balance : 0,
    }));

    this.customColors = this.people.map((person) => ({
      name: person.name,
      value:
        typeof person.balance === 'number' && person.balance >= 0
          ? '#009fb7'
          : '#fed766ff',
    }));
  }

  openAddExpenseDialog(expense?: any): void {
    const dialogRef = this.dialog.open(AddExpenseDialogComponent, {
      width: '400px',
      data: { people: this.allUsers, expense },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadPagos();
    });
  }

  dataLabelFormatting(value: string) {
    return value + '€';
  }

  getTotalPaidByCurrentUser(): number {
    const currentUserEmail = localStorage.getItem('userEmail');
    const user = this.allUsers.find((user) => user.email === currentUserEmail);
    return this.expenses
      .filter((expense) => expense.paidBy === user?.fullName)
      .reduce((total, expense) => total + expense.amount, 0);
  }

  getTotalAccumulated(): number {
    const uniqueIds = new Set(this.expenses.map((expense) => expense.id));
    return Array.from(uniqueIds).reduce((total, id) => {
      const expense = this.expenses.find((expense) => expense.id === id);
      return expense ? total + expense.amount : total;
    }, 0);
  }

  borrarPago(id: number): void {
    this.pagoService.deletePago(id).subscribe(() => {
      this.loadPagos();
    });
  }
}
