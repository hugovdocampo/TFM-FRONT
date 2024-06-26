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
import type { HorarioDto } from '../../model';

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
export class HorarioControllerService {
  constructor(private http: HttpClient) {}
  getHorario<TData = HorarioDto>(
    id: number,
    options?: HttpClientOptions,
  ): Observable<TData> {
    return this.http.get<TData>(`/api/horarios/${id}`, options);
  }
  updateHorario<TData = void>(
    id: number,
    horarioDto: HorarioDto,
    options?: HttpClientOptions,
  ): Observable<TData> {
    return this.http.put<TData>(`/api/horarios/${id}`, horarioDto, options);
  }
  deleteHorario<TData = void>(
    id: number,
    options?: HttpClientOptions,
  ): Observable<TData> {
    return this.http.delete<TData>(`/api/horarios/${id}`, options);
  }
  getHorarios<TData = HorarioDto[]>(
    options?: HttpClientOptions,
  ): Observable<TData> {
    return this.http.get<TData>(`/api/horarios`, options);
  }
  createHorario<TData = number>(
    horarioDto: HorarioDto,
    options?: HttpClientOptions,
  ): Observable<TData> {
    return this.http.post<TData>(`/api/horarios`, horarioDto, options);
  }
}

export type GetHorarioClientResult = NonNullable<HorarioDto>;
export type UpdateHorarioClientResult = NonNullable<void>;
export type DeleteHorarioClientResult = NonNullable<void>;
export type GetHorariosClientResult = NonNullable<HorarioDto[]>;
export type CreateHorarioClientResult = NonNullable<number>;
