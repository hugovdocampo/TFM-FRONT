import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  travels = [
    { title: 'Viaje a Italia', imageUrl: 'https://images.pexels.com/photos/2748019/pexels-photo-2748019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { title: 'Escapada a Japón', imageUrl: 'https://images.pexels.com/photos/18262881/pexels-photo-18262881/free-photo-of-red-gate-in-japanese-garden-in-buenos-aires-in-argentina.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { title: 'Aventura en la India', imageUrl: 'https://images.pexels.com/photos/618491/pexels-photo-618491.jpeg' },
    { title: 'Descubrimiento en Egipto', imageUrl: 'https://images.pexels.com/photos/11563119/pexels-photo-11563119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { title: 'Viaje a Italia', imageUrl: 'https://images.pexels.com/photos/2748019/pexels-photo-2748019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { title: 'Escapada a Japón', imageUrl: 'https://images.pexels.com/photos/18262881/pexels-photo-18262881/free-photo-of-red-gate-in-japanese-garden-in-buenos-aires-in-argentina.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { title: 'Aventura en la India', imageUrl: 'https://images.pexels.com/photos/618491/pexels-photo-618491.jpeg' },
    { title: 'Descubrimiento en Egipto', imageUrl: 'https://images.pexels.com/photos/11563119/pexels-photo-11563119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }
    // Añade más viajes según sea necesario
  ];
}