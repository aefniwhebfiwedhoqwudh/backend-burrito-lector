import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Libro } from './libro.entity';

@Injectable()
export class LibrosService {
  constructor(
    @InjectRepository(Libro)
    private librosRepository: Repository<Libro>,
  ) {}

  async obtenerTodos(): Promise<Libro[]> {
    return this.librosRepository.find();
  }

  async obtenerPorId(id: number): Promise<Libro> {
    const libro = await this.librosRepository.findOne({ where: { id } });
    if (!libro) throw new NotFoundException('Libro no encontrado');
    return libro;
  }

  async crear(datosLibro: Partial<Libro>): Promise<Libro> {
    const nuevoLibro = this.librosRepository.create(datosLibro);
    return this.librosRepository.save(nuevoLibro);
  }

  async actualizar(id: number, datosLibro: Partial<Libro>): Promise<Libro> {
    await this.obtenerPorId(id); // Verifica que exista
    await this.librosRepository.update(id, datosLibro);
    return this.obtenerPorId(id);
  }

  async eliminar(id: number): Promise<void> {
    const libro = await this.obtenerPorId(id);
    await this.librosRepository.remove(libro);
  }
}