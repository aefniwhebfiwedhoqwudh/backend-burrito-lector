import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Valoracion } from './valoracion.entity';

@Injectable()
export class ValoracionesService {
  constructor(
    @InjectRepository(Valoracion)
    private valoracionesRepo: Repository<Valoracion>,
  ) {}

  async calificarLibro(usuarioId: number, libroId: number, puntuacion: number) {
    const nuevaValoracion = this.valoracionesRepo.create({ usuarioId, libroId, puntuacion });
    return this.valoracionesRepo.save(nuevaValoracion);
  }

  // ALGORITMO DE AFINIDAD
  async calcularAfinidad(miUsuarioId: number) {
    const todas = await this.valoracionesRepo.find();
    const misValoraciones = todas.filter(v => v.usuarioId === miUsuarioId);
    const afinidades: { usuarioId: number, afinidad: number, librosEnComun: number }[] = [];
    
    // Obtenemos los IDs de los demás usuarios
    const otrosUsuariosIds = [...new Set(todas.map(v => v.usuarioId))].filter(id => id !== miUsuarioId);

    for (const otroId of otrosUsuariosIds) {
      const susValoraciones = todas.filter(v => v.usuarioId === otroId);
      let similitud = 0;
      let coincidencias = 0;

      for (const miVal of misValoraciones) {
        const suVal = susValoraciones.find(v => v.libroId === miVal.libroId);
        if (suVal) {
          coincidencias++;
          // Entre menor sea la diferencia de puntuación, mayor la similitud (5 es el máximo)
          const diferencia = Math.abs(miVal.puntuacion - suVal.puntuacion);
          similitud += (5 - Math.abs(diferencia)); 
        }
      }

      if (coincidencias > 0) {
        const porcentajeAfinidad = (similitud / (coincidencias * 5)) * 100;
        // La rúbrica pide: "Solo muestre usuarios muy afines"
        if (porcentajeAfinidad >= 75) { 
           afinidades.push({ usuarioId: otroId, afinidad: porcentajeAfinidad, librosEnComun: coincidencias });
        }
      }
    }
    // Ordenamos de mayor a menor afinidad
    return afinidades.sort((a, b) => b.afinidad - a.afinidad);
  }
}