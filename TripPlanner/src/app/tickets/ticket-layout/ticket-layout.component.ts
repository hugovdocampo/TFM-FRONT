import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-ticket-layout',
  templateUrl: './ticket-layout.component.html',
  styleUrls: ['./ticket-layout.component.scss'],
})
export class TicketLayoutComponent implements OnInit {
  event = {
    name: "Sample Event",
    location: "Sample Location",
    startTime: new Date(),
    endTime: new Date(),
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    qrCode: "assets/qr-code.png"
  };
  category = 'party'; // Possible values: 'transport', 'cultural', 'party'
  showFullDescription = false;
  isDesktop: boolean;

  constructor(private renderer: Renderer2) {
    this.isDesktop = window.innerWidth >= 768;
    window.onresize = () => {
      this.isDesktop = window.innerWidth >= 768;
    };
  }

  ngOnInit(): void {
    this.renderer.setStyle(document.body, 'overflow-y', 'hidden');
  }

  ngOnDestroy(): void {
    // Asegúrate de restablecer el estilo cuando el componente se destruya
    this.renderer.removeStyle(document.body, 'overflow-y');
  }

  getBannerImage(category: string): string {
    switch (category) {
      case 'transport': return 'assets/transportsPass.jpg';
      case 'cultural': return 'assets/culturalPass.jpg';
      case 'party': return 'assets/partyPass.jpg';
      default: return 'assets/default.jpg';
    }
  }

  getCategoryIcon(category: string): string {
    switch (category) {
      case 'transport': return 'flight';
      case 'cultural': return 'museum';
      case 'party': return 'local_bar';
      default: return 'help';
    }
  }

  getChipColor(category: string): string {
    switch (category) {
      case 'transport': return '#009fb7ff';
      case 'cultural': return '#D3DFB8';
      case 'party': return '#fed766ff';
      default: return 'gray';
    }
  }

  toggleDescription(): void {
    this.showFullDescription = !this.showFullDescription;
  }
}
