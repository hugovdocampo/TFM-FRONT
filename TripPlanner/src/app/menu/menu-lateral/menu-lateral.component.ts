import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceToken } from 'src/app/auth/auth-service.service';
import { UsuarioControllerService } from 'src/shared/core/api/usuario-controller/usuario-controller.service';
import { ViajeControllerService } from 'src/shared/core/api/viaje-controller/viaje-controller.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss'],
})
export class MenuLateralComponent implements OnInit {
  token$!: Observable<string | null>;
  titulos: any[] = [];

  constructor(
    public dialog: MatDialog,
    private viajeService: ViajeControllerService,
    private userService: UsuarioControllerService,
    private authService: AuthServiceToken,
    private router: Router,
  ) {}

  ngOnInit() {
    this.token$ = this.authService.getToken();
    this.loadTravels();
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

  loadTravels(): void {
    const email = localStorage.getItem('userEmail');
    if (email) {
      this.userService.findUsuarioByEmail(email).subscribe(
        (user) => {
          if (user && user.id) {
            this.viajeService
              .findViajesByUserId(user.id)
              .subscribe((viajes) => {
                this.titulos = viajes.map((viaje) => {
                  return {
                    id: viaje.id,
                    titulo: viaje.titulo,
                  };
                });
              });
          } else {
            console.error('Usuario no encontrado o ID de usuario no válido');
          }
        },
        (error) => {
          console.error('Error al buscar usuario por email: ', error);
        },
      );
    } else {
      console.error('Email no encontrado en localStorage');
    }
  }
  onOptionSelected(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedId = Number(selectElement.value);
    localStorage.setItem('travelId', selectedId.toString());
    this.router.navigate(['/tickets']);
  }
}
