import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceToken } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'app-menu-inferior',
  templateUrl: './menu-inferior.component.html',
  styleUrls: ['./menu-inferior.component.scss'],
})
export class MenuInferiorComponent  implements OnInit{
  token$!: Observable<string | null>;

  links = [
    { url: '/', icon: 'home' },
    { url: '/map', icon: 'map' },
    { url: '/bills', icon: 'receipt' },
    { url: '/calendar', icon: 'calendar_today' },
    { url: '/tickets', icon: 'confirmation_number' },
  ];
  
  activeLink: string = '/'; 

  constructor(private router: Router, private authService: AuthServiceToken) {}

   ngOnInit() {
    this.token$ = this.authService.getToken();
  }

  navigate(url: string): void {
    this.router.navigate([url]);
    this.activeLink = url;
  }

  public logout(): void {
    this.authService.clearToken();
    this.router.navigate(['/login']);
  }
}