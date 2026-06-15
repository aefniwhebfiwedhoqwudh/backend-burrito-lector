import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('libros')
export class Libro {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  titulo!: string;

  @Column({ type: 'varchar' })
  autor!: string;

  @Column({ type: 'varchar' })
  editorial!: string;

  @Column({ type: 'varchar' })
  genero!: string;

  @Column({ type: 'text' }) // 'text' porque la sinopsis es más larga
  sinopsis!: string;

  @Column({ type: 'varchar', nullable: true }) // nullable porque la imagen puede subirse después
  imagenUrl!: string;
}