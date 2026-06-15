import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  // Le decimos explícitamente a MySQL que esto es texto (varchar)
  @Column({ type: 'varchar' })
  nombre!: string;

  @Column({ type: 'varchar', unique: true })
  correo!: string;

  @Column({ type: 'varchar' })
  clave!: string;

  @Column({ type: 'varchar', default: 'lector' })
  rol!: string;
}