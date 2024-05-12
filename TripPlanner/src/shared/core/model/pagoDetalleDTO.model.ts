import { UsuarioDTO } from './usuarioDTO.model';

export interface PagoDTO {
    id: number;
    total: number;
    pagador: UsuarioDTO;
    deudores: UsuarioDTO[];
}