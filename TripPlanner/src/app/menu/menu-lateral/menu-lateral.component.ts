import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { AuthenticationControllerService } from 'src/shared/core/api/authentication-controller/authentication-controller.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss'],
})
export class MenuLateralComponent implements OnInit {
  token$!: Observable<string | null>;

  constructor(private authService: AuthenticationControllerService) {}

  ngOnInit() {
    this.token$ = this.authService.getToken();
  }

  @ViewChild('snav')
  sidenav!: MatSidenav;

  public isExpanded = false;

  public links = [
    { url: '/', label: 'Home', icon: 'home' },
    { url: '/map', label: 'Map', icon: 'map' },
    { url: '/bills', label: 'Bills', icon: 'receipt' },
    { url: '/calendar', label: 'Calendar', icon: 'calendar_today' },
    { url: '/tickets', label: 'Tickets', icon: 'confirmation_number' },
  ];

  public toggleSidenav(): void {
    this.isExpanded = !this.isExpanded;
    this.sidenav.toggle();
  }

  public logout(): void {
    this.authService.clearToken();
    window.location.href = '/login';
  }
}