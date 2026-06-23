import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
export declare class UsuariosService {
    private usuariosRepository;
    constructor(usuariosRepository: Repository<Usuario>);
    buscarPorCorreo(correo: string): Promise<Usuario | null>;
    crear(usuarioData: Partial<Usuario>): Promise<Usuario>;
}
