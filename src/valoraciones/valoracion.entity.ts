import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('valoraciones')
export class Valoracion {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int' })
  usuarioId!: number;

  @Column({ type: 'int' })
  libroId!: number;

  @Column({ type: 'int' })
  puntuacion!: number; // Del 1 al 5
}