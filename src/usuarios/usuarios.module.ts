import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { UsuariosService } from './usuarios.service';

@Module({
  // Esta es la línea mágica que arregla tu error:
  imports: [TypeOrmModule.forFeature([Usuario])], 
  providers: [UsuariosService],
  exports: [UsuariosService], 
})
export class UsuariosModule {}