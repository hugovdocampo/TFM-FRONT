import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceToken } from 'src/app/auth/auth-service.service';
import { UsuarioControllerService } from 'src/shared/core/api/usuario-controller/usuario-controller.service';
import { ViajeControllerService } from 'src/shared/core/api/viaje-controller/viaje-controller.service';
import { LocalStorageService } from '../local-storage-service.service';

@Component({
  selector: 'app-menu-inferior',
  templateUrl: './menu-inferior.component.html',
  styleUrls: ['./menu-inferior.component.scss'],
})
export class MenuInferiorComponent implements OnInit {
  token$!: Observable<string | null>;
  titulos: any[] = [];
  selectedTravelId!: string | null;

  links = [
    { url: '/', icon: 'home' },
    { url: '/map', icon: 'map' },
    { url: '/bills', icon: 'receipt' },
    { url: '/calendar', icon: 'calendar_today' },
    { url: '/tickets', icon: 'confirmation_number' },
  ];

  activeLink: string = '/';

  constructor(
    public dialog: MatDialog,
    private viajeService: ViajeControllerService,
    private userService: UsuarioControllerService,
    private authService: AuthServiceToken,
    private router: Router,
    private localStorageService: LocalStorageService,
  ) {
    
  }

  ngOnInit() {
    this.token$ = this.authService.getToken();
    this.loadTravels();
    this.localStorageService.watchStorage().subscribe((travelId) => {
      this.selectedTravelId = travelId;
    });
  }

  navigate(url: string): void {
    this.router.navigate([url]);
    this.activeLink = url;
  }

  public logout(): void {
    this.authService.clearToken();
    this.router.navigate(['/login']);
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
  onOptionSelected(selectedId: string) {
    this.localStorageService.setItem('travelId', selectedId.toString());
    this.router.navigate(['/tickets']);
  }
}
