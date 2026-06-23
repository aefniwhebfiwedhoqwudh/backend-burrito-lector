import { LibrosService } from './libros.service';
import { Libro } from './libro.entity';
export declare class LibrosController {
    private readonly librosService;
    constructor(librosService: LibrosService);
    obtenerTodos(): Promise<Libro[]>;
    obtenerPorId(id: number): Promise<Libro>;
    crear(datosLibro: Partial<Libro>): Promise<Libro>;
    actualizar(id: number, datosLibro: Partial<Libro>): Promise<Libro>;
    eliminar(id: number): Promise<void>;
    subirImagen(id: number, file: Express.Multer.File): Promise<Libro>;
}
