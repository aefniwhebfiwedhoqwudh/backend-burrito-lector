import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Valoracion } from './valoracion.entity';
import { ValoracionesService } from './valoraciones.service';
import { ValoracionesController } from './valoraciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Valoracion])],
  providers: [ValoracionesService],
  controllers: [ValoracionesController]
})
export class ValoracionesModule {}