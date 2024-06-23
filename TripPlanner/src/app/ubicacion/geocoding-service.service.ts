import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  private nominatimUrl = 'https://nominatim.openstreetmap.org/search';

  constructor(private http: HttpClient) {}

  getCoordinates(address: string): Promise<{ lat: number; lon: number }> {
    const params = {
      q: address,
      format: 'json',
      addressdetails: '1',
      limit: '1',
    };
    return firstValueFrom(
      this.http.get<any[]>(this.nominatimUrl, { params }),
    ).then((response) => {
      if (response && response.length > 0) {
        const location = response[0];
        return { lat: parseFloat(location.lat), lon: parseFloat(location.lon) };
      } else {
        throw new Error('No se pudo encontrar la ubicación');
      }
    });
  }
}
