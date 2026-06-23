import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuarios/usuario.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectRepository(Usuario)
    private usuariosRepo: Repository<Usuario>
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('usuarios')
  async getUsuarios() {
    return this.usuariosRepo.find();
  }

  @Get('make-admin/:id')
  async makeAdmin(@Param('id') id: number) {
    await this.usuariosRepo.update(id, { rol: 'admin' });
    return { mensaje: 'Usuario actualizado a admin' };
  }
}