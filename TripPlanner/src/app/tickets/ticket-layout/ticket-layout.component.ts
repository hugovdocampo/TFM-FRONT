import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TicketControllerService } from 'src/shared/core/api/ticket-controller/ticket-controller.service';
import { TicketDto } from 'src/shared/core/model';

@Component({
  selector: 'app-ticket-layout',
  templateUrl: './ticket-layout.component.html',
  styleUrls: ['./ticket-layout.component.scss'],
})
export class TicketLayoutComponent implements OnInit {
  ticket: TicketDto;

  showFullDescription = false;
  isDesktop: boolean;
  private routeSub!: Subscription;
  private ticketSub!: Subscription;

  constructor(
    private renderer: Renderer2,
    private ticketService: TicketControllerService,
    private route: ActivatedRoute,
  ) {
    this.isDesktop = window.innerWidth >= 768;
    window.onresize = () => {
      this.isDesktop = window.innerWidth >= 768;
    };
    this.ticket = {
      id: 0,
      nombre: '',
      categoria: '',
      descripcion: '',
    };
  }

  ngOnInit(): void {
    this.renderer.setStyle(document.body, 'overflow-y', 'hidden');
    this.routeSub = this.route.params.subscribe((params) => {
      const ticketId = +params['id'];
      this.ticketSub = this.ticketService
        .getTicket(ticketId)
        .subscribe((ticket: any) => {
          this.ticket = ticket;
        });
    });
  }

  ngOnDestroy(): void {
    this.renderer.removeStyle(document.body, 'overflow-y');
  }

  getBannerImage(category: string | undefined): string | undefined {
    switch (category) {
      case 'transport':
        return 'assets/transportsPass.jpg';
      case 'cultural':
        return 'assets/culturalPass.jpg';
      case 'party':
        return 'assets/partyPass.jpg';
      default:
        return 'assets/partyPass.jpg';
    }
  }

  getCategoryIcon(category: string | undefined): string | undefined {
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

  getChipColor(category: string | undefined): string | undefined {
    switch (category) {
      case 'transport':
        return '#009fb7ff';
      case 'cultural':
        return '#D3DFB8';
      case 'party':
        return '#fed766ff';
      default:
        return 'gray';
    }
  }

  toggleDescription(): void {
    this.showFullDescription = !this.showFullDescription;
  }
}
