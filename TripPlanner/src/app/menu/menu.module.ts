import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MenuLateralComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    MenuLateralComponent,
  ]
})
export class MenuModule { }
