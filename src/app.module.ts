import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { LibrosModule } from './libros/libros.module';
import { ValoracionesModule } from './valoraciones/valoraciones.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql-3966d4be-garciabeltranalanhiram-116f.a.aivencloud.com',
      port: 15231,
      username: 'avnadmin',
      password: 'AVNS_kwbq0PolDI38rfbvhKv',
      database: 'defaultdb',
      autoLoadEntities: true,
      synchronize: true, // Crea las tablas automáticamente en la nube
      ssl: {
        rejectUnauthorized: false, // Obligatorio para que Aiven permita la conexión
      },
    }),
    AuthModule,
    UsuariosModule,
    LibrosModule,
    ValoracionesModule,
  ],
})
export class AppModule {}