import { Repository } from 'typeorm';
import { Libro } from './libro.entity';
export declare class LibrosService {
    private librosRepository;
    constructor(librosRepository: Repository<Libro>);
    obtenerTodos(): Promise<Libro[]>;
    obtenerPorId(id: number): Promise<Libro>;
    crear(datosLibro: Partial<Libro>): Promise<Libro>;
    actualizar(id: number, datosLibro: Partial<Libro>): Promise<Libro>;
    eliminar(id: number): Promise<void>;
}
