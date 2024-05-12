import { HorarioDTO } from "./horarioDTO.model";
import { PropuestaDTO } from "./propuestaDTO.model";

export interface ViajeDTO {
    id: number;
    nombre: string;
    horario: HorarioDTO;
    propuestaFinalistaID?: number;
}