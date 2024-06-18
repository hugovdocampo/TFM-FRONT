import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-inferior',
  templateUrl: './menu-inferior.component.html',
  styleUrls: ['./menu-inferior.component.scss'],
})
export class MenuInferiorComponent {
  links = [
    { url: '/', icon: 'home' },
    { url: '/map', icon: 'map' },
    { url: '/bills', icon: 'receipt' },
    { url: '/calendar', icon: 'calendar_today' },
    { url: '/tickets', icon: 'confirmation_number' },
  ];
  
  activeLink: string = '/'; 

  constructor(private router: Router) {}

  navigate(url: string): void {
    this.router.navigate([url]);
    this.activeLink = url;
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
}