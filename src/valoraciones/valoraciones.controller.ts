import { Controller, Post, Get, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ValoracionesService } from './valoraciones.service';

@Controller('valoraciones')
export class ValoracionesController {
  constructor(private readonly valoracionesService: ValoracionesService) {}

  @Post()
  calificar(@Body() datos: { usuarioId: number, libroId: number, puntuacion: number }) {
    return this.valoracionesService.calificarLibro(datos.usuarioId, datos.libroId, datos.puntuacion);
  }

  @Get('afinidad/:usuarioId')
  obtenerAfinidad(@Param('usuarioId', ParseIntPipe) usuarioId: number) {
    return this.valoracionesService.calcularAfinidad(usuarioId);
  }
}