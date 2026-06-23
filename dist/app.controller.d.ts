import { AppService } from './app.service';
import { Repository } from 'typeorm';
import { Usuario } from './usuarios/usuario.entity';
export declare class AppController {
    private readonly appService;
    private usuariosRepo;
    constructor(appService: AppService, usuariosRepo: Repository<Usuario>);
    getHello(): string;
    getUsuarios(): Promise<Usuario[]>;
    makeAdmin(id: number): Promise<{
        mensaje: string;
    }>;
}
