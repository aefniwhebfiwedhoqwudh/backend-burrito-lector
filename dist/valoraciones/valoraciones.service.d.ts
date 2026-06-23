import { Repository } from 'typeorm';
import { Valoracion } from './valoracion.entity';
export declare class ValoracionesService {
    private valoracionesRepo;
    constructor(valoracionesRepo: Repository<Valoracion>);
    calificarLibro(usuarioId: number, libroId: number, puntuacion: number): Promise<Valoracion>;
    calcularAfinidad(miUsuarioId: number): Promise<{
        usuarioId: number;
        afinidad: number;
        librosEnComun: number;
    }[]>;
}
