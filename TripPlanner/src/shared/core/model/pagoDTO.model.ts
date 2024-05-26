import { UsuarioDTO } from './usuarioDTO.model';

export interface PagoDTO {
    id: number;
    total: number;
    idPagador: number;
    idDeudores: number[];
}