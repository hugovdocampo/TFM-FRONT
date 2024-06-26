/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import { HttpClient } from '@angular/common/http';
import type {
  HttpContext,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import type { TicketDto, TicketRequest } from '../../model';

type HttpClientOptions = {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  context?: HttpContext;
  observe?: any;
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: any;
  withCredentials?: boolean;
};

@Injectable({ providedIn: 'root' })
export class TicketControllerService {
  constructor(private http: HttpClient) {}
  getTicket<TData = TicketDto>(
    id: number,
    options?: HttpClientOptions,
  ): Observable<TData> {
    return this.http.get<TData>(`/api/tickets/${id}`, options);
  }
  updateTicket<TData = void>(
    id: number,
    ticketDto: TicketDto,
    options?: HttpClientOptions,
  ): Observable<TData> {
    return this.http.put<TData>(`/api/tickets/${id}`, ticketDto, options);
  }
  deleteTicket<TData = void>(
    id: number,
    options?: HttpClientOptions,
  ): Observable<TData> {
    return this.http.delete<TData>(`/api/tickets/${id}`, options);
  }
  getTickets<TData = TicketDto[]>(
    options?: HttpClientOptions,
  ): Observable<TData> {
    return this.http.get<TData>(`/api/tickets`, options);
  }
  createTicket<TData = number>(
    ticketRequest: TicketRequest,
    options?: HttpClientOptions,
  ): Observable<TData> {
    return this.http.post<TData>(`/api/tickets`, ticketRequest, options);
  }
  getTicketsByViaje<TData = TicketDto[]>(
    id: number,
    options?: HttpClientOptions,
  ): Observable<TData> {
    return this.http.get<TData>(`/api/tickets/viaje/${id}`, options);
  }
}

export type GetTicketClientResult = NonNullable<TicketDto>;
export type UpdateTicketClientResult = NonNullable<void>;
export type DeleteTicketClientResult = NonNullable<void>;
export type GetTicketsClientResult = NonNullable<TicketDto[]>;
export type CreateTicketClientResult = NonNullable<number>;
export type GetTicketsByViajeClientResult = NonNullable<TicketDto[]>;
