import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViajeDialogComponent } from 'src/app/viaje/viaje-dialog/viaje-dialog.component';
import { UsuarioControllerService } from 'src/shared/core/api/usuario-controller/usuario-controller.service';
import { ViajeControllerService } from 'src/shared/core/api/viaje-controller/viaje-controller.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  travels: any[] = [];

  constructor(
    public dialog: MatDialog,
    private viajeService: ViajeControllerService,
    private userService: UsuarioControllerService,
  ) {}

  ngOnInit(): void {
    this.loadTravels();
  }

  addNewTravel() {
    const dialogRef = this.dialog.open(ViajeDialogComponent, {
      width: '80%',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed with result: ', result);
      if (result) {
        this.loadTravels();
      }
    });
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
                this.travels = viajes;
                console.log('Viajes: ', this.travels);
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

  deleteTravel(travelId: number): void {
    this.viajeService.deleteViaje(travelId).subscribe(
      (response) => {
        console.log('Viaje eliminado: ', response);
        this.loadTravels();
      },
      (error) => {
        console.error('Error al eliminar viaje: ', error);
      },
    );
  }

  editTravel(travelId: number): void {
    const dialogRef = this.dialog.open(ViajeDialogComponent, {
      width: '80%',
      data: { travelId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed with result: ', result);
      if (result) {
        this.loadTravels();
      }
    });
  }
}
