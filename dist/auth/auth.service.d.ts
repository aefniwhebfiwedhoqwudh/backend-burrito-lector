import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import { RegistroDto, LoginDto } from './dto/registro.dto';
export declare class AuthService {
    private usuariosService;
    private jwtService;
    constructor(usuariosService: UsuariosService, jwtService: JwtService);
    registro(registroDto: RegistroDto): Promise<{
        mensaje: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        usuario: {
            nombre: string;
            rol: string;
        };
    }>;
}
