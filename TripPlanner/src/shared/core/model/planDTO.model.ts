import { HorarioDTO } from "./horarioDTO.model";
import { PagoDTO } from "./pagoDTO.model";
import { PropuestaDTO } from "./propuestaDTO.model";
import { UbicacionDTO } from "./ubicacionDTO.model";

export interface PlanDTO {
    id: number;
    nombre: string;
    valoracion: number;
    horario?: HorarioDTO;
    propuestaFinalista?: PropuestaDTO;
    ubicacion?: UbicacionDTO;
    pago?: PagoDTO;
    planID: number;
}