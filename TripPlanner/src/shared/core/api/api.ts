export * from './viajesResource.sevice'
import { ViajesResourceService } from './viajesResource.sevice';
export * from './planesResource.service'
import { PlanesResourceService } from './planesResource.service';
export * from './propuestaResource.service';
import { PropuestasResourceService } from './propuestaResource.service';
export * from './ticketsResouce.service';
import { TicketsResourceService } from './ticketsResouce.service';
export * from './pagosResource.service';
import { PagosResourceService } from './pagosResource.service';

export const APIS = [ViajesResourceService, PlanesResourceService, PropuestasResourceService, TicketsResourceService, PagosResourceService];