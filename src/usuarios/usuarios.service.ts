import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(Usuario)
        private usuariosRepository: Repository<Usuario>,
    ) { }

    async buscarPorCorreo(correo: string): Promise<Usuario | null> {
        return this.usuariosRepository.findOne({ where: { correo } });
    }

    async crear(usuarioData: Partial<Usuario>): Promise<Usuario> {
        const nuevoUsuario = this.usuariosRepository.create(usuarioData);
        return this.usuariosRepository.save(nuevoUsuario);
    }
}