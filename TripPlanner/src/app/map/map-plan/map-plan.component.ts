import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { Map as MapLibre, Marker, NavigationControl, Popup } from 'maplibre-gl';
import { PlanComponent } from 'src/shared/components/plan/plan.component';
import { PlanesResourceService } from 'src/shared/core/api/planesResource.service';
import { PlanDetalleDTO } from 'src/shared/core/model/planDetalleDTO.model';

@Component({
  selector: 'app-map-plan',
  templateUrl: './map-plan.component.html',
  styleUrls: ['./map-plan.component.scss'],
})
export class MapPlanComponent implements OnInit, AfterViewInit, OnDestroy {
  initialState = { lng: -3.66, lat: 40.5, zoom: 14 };

  map: MapLibre | undefined;

  markers: Marker[] = [];

  showPlan = true;

  planesOrderByDate: Map<string, { color: string; planes: PlanDetalleDTO[] }> =
    new Map();

  selectedOptions: any[] = [];

  allSelected = true;

  NavigationOptions = {
    showCompass: true,
    showZoom: true,
    visualizePitch: true,
  };

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  @ViewChild('dias') dias!: MatSelectionList;

  ngOnInit(): void {
    this._planesReource.getAllPlanesByViaje(1).subscribe((planes) => {
      this.planesOrderByDate = this.organizarPlanesPorFecha(planes);
      this.selectedOptions = Array.from(this.planesOrderByDate.values());
    });
  }

  constructor(private _planesReource: PlanesResourceService, public dialog: MatDialog) {}

  ngAfterViewInit(): void {
    let map = (this.map = new MapLibre({
      container: this.mapContainer.nativeElement,
      style: `https://api.maptiler.com/maps/streets/style.json?key=Ke6yX0uzyu92hbElN1hl`,
      center: [this.initialState.lng, this.initialState.lat],
      zoom: this.initialState.zoom,
    }));

    this.map.addControl(
      new NavigationControl(this.NavigationOptions),
      'top-right'
    );

    this.onSelectionChange(this.selectedOptions);
  }

  ngOnDestroy() {
    this.map?.remove();
  }

  toggleAllSelection(checked: boolean) {
    if (checked) {
      this.dias.selectAll();
    } else {
      this.dias.deselectAll();
    }
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

  organizarPlanesPorFecha(
    planes: PlanDetalleDTO[]
  ): Map<string, { color: string; planes: PlanDetalleDTO[] }> {
    const map = new Map<string, { color: string; planes: PlanDetalleDTO[] }>();

    planes.forEach((plan) => {
      if (plan.horario && plan.horario.diaInicio) {
        const fechaInicio = plan.horario.diaInicio;

        if (!map.has(fechaInicio)) {
          map.set(fechaInicio, {
            color:
              map.size < this.colorArray.length
                ? this.colorArray[map.size]
                : this.getRandomColor(map),
            planes: [],
          });
        }

        map.get(fechaInicio)?.planes.push(plan);
      }
    });

    return map;
  }

  dateToSring(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  getRandomColor(
    map: Map<string, { color: string; planes: PlanDetalleDTO[] }>
  ): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    const usedColors = Array.from(map.values()).map((value) => value.color);
    while (usedColors.includes(color)) {
      color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
    }

    return color;
  }

  onSelectionChange(selectedOptions: any): void {
    this.markers.forEach((marker) => marker.remove());
    this.markers = [];
    
    this.allSelected = selectedOptions.length === this.planesOrderByDate.size

    selectedOptions.forEach((day: any) => {
      if (day) {
        day.planes.forEach((plan: any) => {
          if (!plan.ubicacion?.coordenadas) return;
          const name = 'abc';
          const innerHtmlContent = `<h1>${plan.nombre}</h1><p>${plan.descripcion}</p>`;
          const divElement = document.createElement('div');
          const assignBtn = document.createElement('div');
          assignBtn.innerHTML = `<button class="btn btn-success btn-simple text-white">Ver detalle</button>`;
          divElement.innerHTML = innerHtmlContent;
          divElement.appendChild(assignBtn);
          // btn.className = 'btn';
          assignBtn.addEventListener('click', (e) => {
            //this.plan.loadForm(plan);
            this.dialog.open(PlanComponent, {data: plan});
          });
          this.markers.push(
            new Marker({ color: day?.color })
              .setLngLat(plan.ubicacion.coordenadas)
              .addTo(this.map!)
              .setPopup(new Popup().setDOMContent(divElement))
          );
        });
      }
    });
  }

  private colorArray = [
    '#FF6633',
    '#FF33FF',
    '#00B3E6',
    '#3366E6',
    '#B34D4D',
    '#80B300',
    '#809900',
    '#6680B3',
    '#66991A',
    '#FF1A66',
    '#E6331A',
    '#33FFCC',
    '#66994D',
    '#4D8000',
    '#B33300',
    '#CC80CC',
    '#66664D',
    '#991AFF',
    '#4DB3FF',
    '#1AB399',
    '#E666B3',
    '#33991A',
    '#CC9999',
    '#B3B31A',
    '#00E680',
    '#4D8066',
    '#4D80CC',
    '#9900B3',
    '#E64D66',
    '#4DB380',
    '#FF4D4D',
    '#6666FF',
  ];
}
