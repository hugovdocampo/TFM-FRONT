// app.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TripPlanner';
  
  constructor(private router: Router) {}

  goToDashboard() {
    this.router.navigate(['/bills', 'dashboard']);  // Asegúrate de que coincida con la configuración de ruta
  }
}
