import { AuthService } from './auth.service';
import { RegistroDto, LoginDto } from './dto/registro.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
