import { HorarioDTO } from "./horarioDTO.model";
import { PropuestaDTO } from "./propuestaDTO.model";

export interface ViajeDetalleDTO {
    id: number;
    nombre: string;
    horario: HorarioDTO;
    propuestaFinalista?: PropuestaDTO;
    prouestas?: PropuestaDTO[];
}