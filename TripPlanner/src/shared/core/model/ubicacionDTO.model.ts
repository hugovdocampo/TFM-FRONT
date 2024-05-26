export interface UbicacionDTO {
    direccion: string;
    coordenadas: [number, number];
    esExterior: boolean;
    tipoDeVestimenta?: string;
    requisitosDeAcceso?: string;
}