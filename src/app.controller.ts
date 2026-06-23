import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuarios/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

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

  @Get('make-admin/:correo')
  async makeAdmin(@Param('correo') correo: string) {
    await this.usuariosRepo.update({ correo }, { rol: 'admin' });
    return { mensaje: 'Usuario actualizado a admin' };
  }
}