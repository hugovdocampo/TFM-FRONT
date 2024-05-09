import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddExpenseDialogComponent } from '../add-expense-dialog/add-expense-dialog.component';

@Component({
  selector: 'app-bills-dashboard',
  templateUrl: './bills-dashboard.component.html',
  styleUrls: ['./bills-dashboard.component.scss']
})
export class BillsDashboardComponent {
  people = [
    { name: 'Hugo', balance: 150 },
    { name: 'Rodrigo', balance: -50 },
    { name: 'Paula', balance: 100 }
  ];

  transactions = [
    { debtor: 'Rodrigo', creditor: 'Hugo', amount: 50 },
    { debtor: 'Paula', creditor: 'Hugo', amount: 50 }
  ];
  budgetData = [
    { name: 'Disponible', value: 850 },
    { name: 'Gastado', value: 165 }
  ];

  totalBudget = 1000;  // Ejemplo de presupuesto total
  spentAmount = this.transactions.reduce((sum, item) => sum + item.amount, 0);
  availableAmount = this.totalBudget - this.spentAmount;
  daysLeft = 30;

  chartData = this.people.map(person => ({
    name: person.name,
    value: person.balance
  }));

  customColors = this.people.map(person => ({
    name: person.name,
    value: person.balance >= 0 ? '#4CAF50' : '#F44336'
  }));

  displayedColumns: string[] = ['debtor', 'creditor', 'amount', 'paid'];



  expenses = [
    { title: 'Dinner', amount: 120, paidBy: 'Alice', date: new Date(2023, 3, 21) },
    { title: 'Taxi', amount: 45, paidBy: 'Bob', date: new Date(2023, 3, 22) },
    { title: 'Lunch', amount: 80, paidBy: 'Alice', date: new Date(2023, 3, 23) },
    { title: 'Dinner', amount: 120, paidBy: 'Alice', date: new Date(2023, 3, 21) },
    { title: 'Taxi', amount: 45, paidBy: 'Bob', date: new Date(2023, 3, 22) },
    { title: 'Dinner', amount: 120, paidBy: 'Alice', date: new Date(2023, 3, 21) },
    { title: 'Taxi', amount: 45, paidBy: 'Bob', date: new Date(2023, 3, 22) },
    { title: 'Lunch', amount: 80, paidBy: 'Alice', date: new Date(2023, 3, 23) },
    { title: 'Dinner', amount: 120, paidBy: 'Alice', date: new Date(2023, 3, 21) },
    { title: 'Taxi', amount: 45, paidBy: 'Bob', date: new Date(2023, 3, 22) },
    { title: 'Taxi', amount: 45, paidBy: 'Bob', date: new Date(2023, 3, 22) },
    { title: 'Lunch', amount: 80, paidBy: 'Alice', date: new Date(2023, 3, 23) },
    { title: 'Dinner', amount: 120, paidBy: 'Alice', date: new Date(2023, 3, 21) },
    { title: 'Taxi', amount: 45, paidBy: 'Bob', date: new Date(2023, 3, 22) },
  ];

  constructor(public dialog: MatDialog) {}

  openAddExpenseDialog(): void {
    const dialogRef = this.dialog.open(AddExpenseDialogComponent, {
      width: '400px',
      data: { people: this.people }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed. Data:', result);
      // Aquí podrías actualizar las transacciones o balances según el resultado
    });
  }

  markAsPaid(transaction: any): void {
    console.log('Transaction marked as paid:', transaction);
  }
}
