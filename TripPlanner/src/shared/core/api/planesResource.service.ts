/**
 * OpenAPI definition
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *//* tslint:disable:no-unused-variable member-ordering */

 import { Inject, Injectable, Optional }                      from '@angular/core';
 import { HttpClient, HttpHeaders, HttpParams,
          HttpResponse, HttpEvent }                           from '@angular/common/http';
 import { CustomHttpUrlEncodingCodec }                        from '../encoder';
 
 import { Observable, of }                                        from 'rxjs';
 
 import { PlanDTO } from '../model/planDTO.model'; 
 import { PlanDetalleDTO } from '../model/planDetalleDTO.model';
 
 import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
 import { Configuration }                                     from '../configuration';
 
 
 @Injectable()
 export class PlanesResourceService {
 
     protected basePath = 'https://...';
     public defaultHeaders = new HttpHeaders();
     public configuration = new Configuration();
 
     constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
         if (basePath) {
             this.basePath = basePath;
         }
         if (configuration) {
             this.configuration = configuration;
             this.basePath = basePath || configuration.basePath || this.basePath;
         }
     }
 
     /**
      * @param consumes string[] mime-types
      * @return true: consumes contains 'multipart/form-data', false: otherwise
      */
     private canConsumeForm(consumes: string[]): boolean {
         const form = 'multipart/form-data';
         for (const consume of consumes) {
             if (form === consume) {
                 return true;
             }
         }
         return false;
     }
 
 
     /**
      * 
      * 
      * @param body 
      * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
      * @param reportProgress flag to report request and response progress.
      */
     public createPlan(body: PlanDTO, observe?: 'body', reportProgress?: boolean): Observable<number>;
     public createPlan(body: PlanDTO, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<number>>;
     public createPlan(body: PlanDTO, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<number>>;
     public createPlan(body: PlanDTO, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
 
         if (body === null || body === undefined) {
             throw new Error('Required parameter body was null or undefined when calling create Planes.');
         }
 
         let headers = this.defaultHeaders;
 
         // to determine the Accept header
         let httpHeaderAccepts: string[] = [
             'application/json',
             '*/*'
         ];
         const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         if (httpHeaderAcceptSelected != undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
         // to determine the Content-Type header
         const consumes: string[] = [
             'application/json'
         ];
         const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
         if (httpContentTypeSelected != undefined) {
             headers = headers.set('Content-Type', httpContentTypeSelected);
         }
 
         return this.httpClient.request<number>('post',`${this.basePath}/api/planes`,
             {
                 body: body,
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }
 
     /**
      * 
      * 
      * @param id 
      * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
      * @param reportProgress flag to report request and response progress.
      */
     public deletePlan(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
     public deletePlan(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
     public deletePlan(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
     public deletePlan(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
 
         if (id === null || id === undefined) {
             throw new Error('Required parameter id was null or undefined when calling delete Planes.');
         }
 
         let headers = this.defaultHeaders;
 
         // to determine the Accept header
         let httpHeaderAccepts: string[] = [
             '*/*'
         ];
         const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         if (httpHeaderAcceptSelected != undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
         // to determine the Content-Type header
         const consumes: string[] = [
         ];
 
         return this.httpClient.request<any>('delete',`${this.basePath}/api/planes/${encodeURIComponent(String(id))}`,
             {
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }
 
     /**
      * 
      * 
      * @param filter 
      * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
      * @param reportProgress flag to report request and response progress.
      */
     public getAllPlanes(filter?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<PlanDetalleDTO>>;
     public getAllPlanes(filter?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<PlanDetalleDTO>>>;
     public getAllPlanes(filter?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<PlanDetalleDTO>>>;
     public getAllPlanes(filter?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
 
 
         let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
         if (filter !== undefined && filter !== null) {
             queryParameters = queryParameters.set('filter', <any>filter);
         }
 
         let headers = this.defaultHeaders;
 
         // to determine the Accept header
         let httpHeaderAccepts: string[] = [
             'application/json',
             '*/*'
         ];
         const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         if (httpHeaderAcceptSelected != undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
         // to determine the Content-Type header
         const consumes: string[] = [
         ];
 
         return this.httpClient.request<Array<PlanDetalleDTO>>('get',`${this.basePath}/api/planes`,
             {
                 params: queryParameters,
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }
 
     /**
      * 
      * 
      * @param id 
      * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
      * @param reportProgress flag to report request and response progress.
      */
     public getAllPlanesByViaje(id: number, observe?: 'body', reportProgress?: boolean): Observable<Array<PlanDetalleDTO>>;
     public getAllPlanesByViaje(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<PlanDetalleDTO>>>;
     public getAllPlanesByViaje(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<PlanDetalleDTO>>>;
     public getAllPlanesByViaje(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
 
         if (id === null || id === undefined) {
             throw new Error('Required parameter id was null or undefined when calling getAllPlanes By Viaje.');
         }
 
         let headers = this.defaultHeaders;
 
         // to determine the Accept header
         let httpHeaderAccepts: string[] = [
             'application/json',
             '*/*'
         ];
         const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         if (httpHeaderAcceptSelected != undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
         // to determine the Content-Type header
         const consumes: string[] = [
         ];
 
         /*
         return this.httpClient.request<Array<PlanDetalleDTO>>('get',`${this.basePath}/api/planes/viaje/${encodeURIComponent(String(id))}`,
             {
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
            */


         // Generar datos de prueba
        const planes: PlanDetalleDTO[] = [];

        for (let i = 1; i <= 10; i++) {
            const plan: PlanDetalleDTO = {
                id: 1,
                nombre: `Plan ${i}`,
                valoracion: i,
                horario: {
                    id: i,
                    fechaInicio: new Date(),
                    fechaFin: new Date()
                },
                ubicacion: {
                    id: i,
                    direccion: `Dirección ${i}`,
                    esExteriror: i % 2 === 0 ? true : false
                },
                pago: {
                    id: i,
                    total: i * 100,
                    pagador: i,
                    deudores: [i + 1, i + 2],
                    planID: 1
                },
                tickets: [
                    {
                        id: i,
                        qr: `QR${i}`,
                        asiento: `Asiento ${i}`,
                        documento: `Documento ${i}`,
                        planID: 1
                    }
                ]
            };
            planes.push(plan);
        }

        return of(planes); // Convertir los datos en un observable y retornarlos
     }
 
     /**
      * 
      * 
      * @param id 
      * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
      * @param reportProgress flag to report request and response progress.
      */
     public getPlan(id: number, observe?: 'body', reportProgress?: boolean): Observable<PlanDTO>;
     public getPlan(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PlanDTO>>;
     public getPlan(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PlanDTO>>;
     public getPlan(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
 
         if (id === null || id === undefined) {
             throw new Error('Required parameter id was null or undefined when calling getPlanes.');
         }
 
         let headers = this.defaultHeaders;
 
         // to determine the Accept header
         let httpHeaderAccepts: string[] = [
             'application/json',
             '*/*'
         ];
         const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         if (httpHeaderAcceptSelected != undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
         // to determine the Content-Type header
         const consumes: string[] = [
         ];
 
         
         return this.httpClient.request<PlanDTO>('get',`${this.basePath}/api/planes/${encodeURIComponent(String(id))}`,
             {
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }
 
     /**
      * 
      * 
      * @param body 
      * @param id 
      * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
      * @param reportProgress flag to report request and response progress.
      */
     public updatePlan(body: PlanDTO, id: number, observe?: 'body', reportProgress?: boolean): Observable<number>;
     public updatePlan(body: PlanDTO, id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<number>>;
     public updatePlan(body: PlanDTO, id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<number>>;
     public updatePlan(body: PlanDTO, id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
 
         if (body === null || body === undefined) {
             throw new Error('Required parameter body was null or undefined when calling updatePlanes.');
         }
 
         if (id === null || id === undefined) {
             throw new Error('Required parameter id was null or undefined when calling updatePlanes.');
         }
 
         let headers = this.defaultHeaders;
 
         // to determine the Accept header
         let httpHeaderAccepts: string[] = [
             'application/json',
             '*/*'
         ];
         const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         if (httpHeaderAcceptSelected != undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
         // to determine the Content-Type header
         const consumes: string[] = [
             'application/json'
         ];
         const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
         if (httpContentTypeSelected != undefined) {
             headers = headers.set('Content-Type', httpContentTypeSelected);
         }
 
         return this.httpClient.request<number>('put',`${this.basePath}/api/planes/${encodeURIComponent(String(id))}`,
             {
                 body: body,
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }
 
 }
 