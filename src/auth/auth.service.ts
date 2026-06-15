import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegistroDto, LoginDto } from './dto/registro.dto';

@Injectable()
export class AuthService {
    constructor(
        private usuariosService: UsuariosService,
        private jwtService: JwtService,
    ) { }

    async registro(registroDto: RegistroDto) {
        const existe = await this.usuariosService.buscarPorCorreo(registroDto.correo);
        if (existe) {
            throw new BadRequestException('El correo ya está registrado');
        }

        // Encriptar la contraseña (hash)
        const salt = await bcrypt.genSalt(10);
        const claveEncriptada = await bcrypt.hash(registroDto.clave, salt);

        // Guardar el nuevo usuario
        const nuevoUsuario = await this.usuariosService.crear({
            nombre: registroDto.nombre,
            correo: registroDto.correo,
            clave: claveEncriptada,
        });

        return { mensaje: 'Burrito lector registrado exitosamente' };
    }

    async login(loginDto: LoginDto) {
        const usuario = await this.usuariosService.buscarPorCorreo(loginDto.correo);

        if (!usuario) {
            throw new UnauthorizedException('Credenciales incorrectas');
        }

        // Comparar la contraseña ingresada con la encriptada en la BD
        const esValida = await bcrypt.compare(loginDto.clave, usuario.clave!);
        if (!esValida) {
            throw new UnauthorizedException('Credenciales incorrectas');
        }

        // Generar el Token JWT
        const payload = { sub: usuario.id, correo: usuario.correo, rol: usuario.rol };
        return {
            access_token: this.jwtService.sign(payload),
            usuario: { nombre: usuario.nombre, rol: usuario.rol }
        };
    }
}