import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-plan',
  templateUrl: './map-plan.component.html',
  styleUrls: ['./map-plan.component.scss']
})
export class MapPlanComponent implements OnInit {
  lat = 16.62662018;
  lon = 49.2125578;
  zoom = 14;

  ngOnInit(): void {
    this.getUserLocation();
  }

  getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.lat = position.coords.latitude;
          this.lon = position.coords.longitude;
        },
        (error) => {
          console.error('Error obteniendo la ubicación', error);
        }
      );
    } else {
      console.error('Geolocalización no soportada por este navegador.');
    }
  }
}
