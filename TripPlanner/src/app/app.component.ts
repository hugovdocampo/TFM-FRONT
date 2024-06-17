import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  isDesktop: boolean;

  constructor(private router: Router) {
    this.isDesktop = window.innerWidth >= 768;
    window.onresize = () => {
      this.isDesktop = window.innerWidth >= 768;
    };
  }

  ngOnInit(): void {
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.router.navigate(['/login']); // o ['signup'] si quieres redirigir a signup
    }
  }
}