export interface PropuestaDTO {
    id: number;
    titulo: string;
    descripcion?: string;
    presupuesto?: number;
    valoracion: number;
    viajeID: number;
}