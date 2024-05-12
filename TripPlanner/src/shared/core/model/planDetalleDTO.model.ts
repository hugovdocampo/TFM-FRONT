import { HorarioDTO } from "./horarioDTO.model";
import { PagoDTO } from "./pagoDTO.model";
import { TicketDTO } from "./ticketDTO.model";
import { UbicacionDTO } from "./ubicacionDTO.model";

export interface PlanDetalleDTO {
    id: number;
    nombre: string;
    valoracion: number;
    horario?: HorarioDTO;
    ubicacion?: UbicacionDTO;
    pago?: PagoDTO;
    tickets?: TicketDTO[];
}