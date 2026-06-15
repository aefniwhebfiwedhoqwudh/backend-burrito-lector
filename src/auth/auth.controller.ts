import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistroDto, LoginDto } from './dto/registro.dto';

@Controller('auth') // La ruta principal será http://localhost:3000/auth
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registro') // Ruta: http://localhost:3000/auth/registro
  registro(@Body() registroDto: RegistroDto) {
    return this.authService.registro(registroDto);
  }

  @Post('login') // Ruta: http://localhost:3000/auth/login
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}