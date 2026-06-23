import { ValoracionesService } from './valoraciones.service';
export declare class ValoracionesController {
    private readonly valoracionesService;
    constructor(valoracionesService: ValoracionesService);
    calificar(datos: {
        usuarioId: number;
        libroId: number;
        puntuacion: number;
    }): Promise<import("./valoracion.entity").Valoracion>;
    obtenerAfinidad(usuarioId: number): Promise<{
        usuarioId: number;
        afinidad: number;
        librosEnComun: number;
    }[]>;
}
