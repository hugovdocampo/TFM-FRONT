import { Component, ElementRef, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import * as maplibregl from 'maplibre-gl';
import { Map } from 'maplibre-gl';

@Component({
  selector: 'app-map-plan',
  templateUrl: './map-plan.component.html',
  styleUrls: ['./map-plan.component.scss']
})
export class MapPlanComponent implements AfterViewInit, OnDestroy {

  lat = 16.62662018;
  lon = 49.2125578;
  zoom = 14;

  map: Map | undefined;

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    const initialState = { lng: 139.753, lat: 35.6844, zoom: 14 };

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=YOUR_MAPTILER_API_KEY_HERE`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });
  }

  ngOnDestroy() {
    this.map?.remove();
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
