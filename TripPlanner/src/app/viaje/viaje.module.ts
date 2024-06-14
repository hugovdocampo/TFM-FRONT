import { NgModule } from '@angular/core';
import { ViajeDialogComponent } from './viaje-dialog/viaje-dialog.component';
import { SharedModule } from 'src/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ViajeDialogComponent],
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ViajeModule {}
