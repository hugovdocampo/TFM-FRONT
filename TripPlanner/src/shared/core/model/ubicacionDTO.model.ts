export interface UbicacionDTO {
    id: number;
    direccion: string;
    coordenadas: [number, number];
    esExteriror: boolean;
    tipoDeVestimenta?: string;
    requisitosDeAcceso?: string;
}