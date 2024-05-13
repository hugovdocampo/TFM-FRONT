import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Map, Marker, NavigationControl, Offset, Popup } from 'maplibre-gl';

@Component({
  selector: 'app-map-plan',
  templateUrl: './map-plan.component.html',
  styleUrls: ['./map-plan.component.scss'],
})
export class MapPlanComponent implements OnInit, AfterViewInit, OnDestroy {
  initialState = { lng: -3.66, lat: 40.5, zoom: 14 };

  map: Map | undefined;

  markers: Marker[] = [];

  NavigationOptions = {
    showCompass: true,
    showZoom: true,
    visualizePitch: true,
  };

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: `https://api.maptiler.com/maps/streets/style.json?key=Ke6yX0uzyu92hbElN1hl`,
      center: [this.initialState.lng, this.initialState.lat],
      zoom: this.initialState.zoom,
    });

    this.map.addControl(
      new NavigationControl(this.NavigationOptions),
      'top-right'
    );

    this.markers.push(
      new Marker({ color: '#FF0000' }).setLngLat([-6.09, 40.02]).addTo(this.map)
    );
    this.markers.push(
      new Marker({ color: '#FF0000' }).setLngLat([-3.66, 40.5]).addTo(this.map)
    );
    console.log(this.markers);
    const map2 = this.map;

    let markerHeight = 50,
      markerRadius = 10,
      linearOffset = 25;
    let popupOffsets = {
      top: [0, 0],
      'top-left': [0, 0],
      'top-right': [0, 0],
      bottom: [0, -markerHeight],
      'bottom-left': [
        linearOffset,
        (markerHeight - markerRadius + linearOffset) * -1,
      ],
      'bottom-right': [
        -linearOffset,
        (markerHeight - markerRadius + linearOffset) * -1,
      ],
      left: [markerRadius, (markerHeight - markerRadius) * -1],
      right: [-markerRadius, (markerHeight - markerRadius) * -1],
    };
    let popup = new Popup({ className: 'my-class' })
      .setLngLat([-3.66, 40.501])
      .setHTML('<h1>Hello World!</h1>')
      .setMaxWidth('300px')
      .addTo(this.map);
  }

  ngOnDestroy() {
    this.map?.remove();
  }

  getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.initialState.lat = position.coords.latitude;
          this.initialState.lng = position.coords.longitude;
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
