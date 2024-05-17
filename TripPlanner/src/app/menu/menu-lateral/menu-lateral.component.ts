import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss'],
})
export class MenuLateralComponent {
  @ViewChild('snav')
  sidenav!: MatSidenav;

  public isExpanded = false; 

  public links = [
    { url: '/', label: 'Home', icon: 'home' },
    { url: '/map', label: 'Map', icon: 'map' },
    { url: '/bills', label: 'Bills', icon: 'receipt' },
    { url: '/calendar', label: 'Calendar', icon: 'calendar_today' },
   
  ];

  public toggleSidenav(): void {
    this.isExpanded = !this.isExpanded; 
    this.sidenav.toggle();
  }
}
