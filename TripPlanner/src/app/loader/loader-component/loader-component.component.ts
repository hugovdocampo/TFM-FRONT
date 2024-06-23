import { Component } from '@angular/core';
import { LoaderService } from 'src/shared/core/loader-service.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader-component.component.html',
  styleUrls: ['./loader-component.component.scss']
})
export class LoaderComponent {
  loading$ = this.loaderService.loading$;

  constructor(private loaderService: LoaderService) {}
}