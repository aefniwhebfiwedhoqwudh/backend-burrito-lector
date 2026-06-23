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
      host: 'mysql-20540ea8-alejandroramirez7981-2f36.l.aivencloud.com',
      port: 20523,
      username: 'avnadmin',
      password: 'AVNS_96GhXbWzge3g0JN80Xx',
      database: 'defaultdb',
      autoLoadEntities: true,
      synchronize: true,
      connectTimeout: 30000,
      ssl: {
        rejectUnauthorized: false,
        minVersion: 'TLSv1.2'
      },
    }),
    AuthModule,
    UsuariosModule,
    LibrosModule,
    ValoracionesModule,
  ],
})
export class AppModule {}