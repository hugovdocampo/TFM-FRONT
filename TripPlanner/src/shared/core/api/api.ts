export * from './viajesResource.sevice'
import { ViajesResourceService } from './viajesResource.sevice';
export * from './planesResource.sevice'
import { PlanesResourceService } from './planesResource.sevice';
export * from './propuestasResource.sevice';
import { PropuestasResourceService } from './propuestasResource.sevice';
export * from './ticketsResource.sevice';
import { TicketsResourceService } from './ticketsResource.sevice';
export * from './pagosResource.sevice';
import { PagosResourceService } from './pagosResource.sevice';

export const APIS = [ViajesResourceService, PlanesResourceService, PropuestasResourceService, TicketsResourceService, PagosResourceService];