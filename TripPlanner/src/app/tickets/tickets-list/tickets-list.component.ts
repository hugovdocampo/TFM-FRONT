import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { TicketControllerService } from 'src/shared/core/api/ticket-controller/ticket-controller.service';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss'],
})
export class TicketsListComponent implements OnInit {
  isDesktop: boolean;
  tickets: any[] = [];

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private ticketService: TicketControllerService,
  ) {
    this.isDesktop = window.innerWidth >= 768;
    window.onresize = () => {
      this.isDesktop = window.innerWidth >= 768;
    };
  }

  ngOnInit(): void {
    this.renderer.setStyle(document.body, 'overflow-y', 'hidden');
    var travelId = Number(localStorage.getItem('travelId'));
    this.ticketService
      .getTicketsByViaje(travelId)
      .subscribe((tickets: any[]) => {
        this.tickets = tickets;
        console.log('Tickets: ', this.tickets);
      });
  }

  ngOnDestroy(): void {
    // Asegúrate de restablecer el estilo cuando el componente se destruya
    this.renderer.removeStyle(document.body, 'overflow-y');
  }

  getBannerImage(category: string): string {
    switch (category) {
      case 'transport':
        return 'assets/transportsPass.jpg';
      case 'cultural':
        return 'assets/culturalPass.jpg';
      case 'party':
        return 'assets/partyPass.jpg';
      default:
        return 'assets/default.jpg';
    }
  }

  getCategoryIcon(category: string): string {
    switch (category) {
      case 'transport':
        return 'flight';
      case 'cultural':
        return 'museum';
      case 'party':
        return 'local_bar';
      default:
        return 'help';
    }
  }

  getCategoryColor(category: string): string {
    switch (category) {
      case 'transport':
        return '#009fb7ff';
      case 'cultural':
        return '#36C096';
      case 'party':
        return '#fed766ff';
      default:
        return 'black';
    }
  }

  openTicket(ticketId: number): void {
    this.router.navigate(['/ticket', ticketId]);
  }
}
