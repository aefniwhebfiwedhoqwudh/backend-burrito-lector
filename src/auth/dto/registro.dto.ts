import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegistroDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre!: string;

  @IsEmail({}, { message: 'Debe ser un correo válido' })
  correo!: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'La clave debe tener al menos 6 caracteres' })
  clave!: string;
}

export class LoginDto {
  @IsEmail()
  correo!: string;

  @IsNotEmpty()
  clave!: string;
}