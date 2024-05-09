import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillsRoutingModule } from './bills-routing.module';
import { BillsDashboardComponent } from './bills-dashboard/bills-dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AddExpenseDialogComponent } from './add-expense-dialog/add-expense-dialog.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BillsDashboardComponent,
    AddExpenseDialogComponent
  ],
  imports: [
    CommonModule,
    BillsRoutingModule,
    SharedModule,
    NgxChartsModule,
    FormsModule
  ]
})
export class BillsModule { }
