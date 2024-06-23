import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MenuInferiorComponent } from './menu-inferior/menu-inferior.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MenuLateralComponent,
    MenuInferiorComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    MenuLateralComponent,
    MenuInferiorComponent,
  ]
})
export class MenuModule { }
