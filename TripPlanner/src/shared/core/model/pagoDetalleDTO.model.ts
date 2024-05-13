import { UsuarioDTO } from './usuarioDTO.model';

export interface PagoDetalleDTO {
    id: number;
    total: number;
    pagador: UsuarioDTO;
    deudores: UsuarioDTO[];
}