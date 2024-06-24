import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/menu/local-storage-service.service';
import { TicketControllerService } from 'src/shared/core/api/ticket-controller/ticket-controller.service';
import { TicketDialogComponent } from '../ticket-dialog/ticket-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
    private localStorageService: LocalStorageService,
    private dialog: MatDialog
  ) {
    this.isDesktop = window.innerWidth >= 768;
    window.onresize = () => {
      this.isDesktop = window.innerWidth >= 768;
    };
  }

  ngOnInit(): void {
    this.renderer.setStyle(document.body, 'overflow-y', 'hidden');
    var travelId = Number(this.localStorageService.getItem('travelId'));
    this.ticketService
      .getTicketsByViaje(travelId)
      .subscribe((tickets: any[]) => {
        this.tickets = tickets;
        console.log('Tickets: ', this.tickets);
      });
  }

  ngOnDestroy(): void {
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

  addNewTicket(): void {
    this.renderer.setStyle(document.body, 'overflow-y', 'hidden');
    var travelId = Number(this.localStorageService.getItem('travelId'));
    const dialogRef = this.dialog.open(TicketDialogComponent, {
      data: { travelId: travelId }
    });

    dialogRef.afterClosed().subscribe((ticketId: any) => {
      if (ticketId) {
        this.router.navigate(['/ticket', ticketId]);
      }
    });
  }
}
