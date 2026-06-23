import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  ParseIntPipe, 
  UseInterceptors, 
  UploadedFile,
  UseGuards,
  Res
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { LibrosService } from './libros.service';
import { Libro } from './libro.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { Response } from 'express';

@Controller('libros')
export class LibrosController {
  constructor(private readonly librosService: LibrosService) {}

  // ==========================================
  // RUTAS PÚBLICAS (Cualquiera puede verlas)
  // ==========================================

  @Get()
  async obtenerTodos(@Res() res: Response) {
    res.set('Cache-Control', 'no-store');
    const libros = await this.librosService.obtenerTodos();
    return res.json(libros);
  }

  @Get(':id')
  async obtenerPorId(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    res.set('Cache-Control', 'no-store');
    const libro = await this.librosService.obtenerPorId(id);
    return res.json(libro);
  }

  // ==========================================
  // RUTAS PROTEGIDAS (Requieren Token JWT)
  // ==========================================

  @UseGuards(JwtAuthGuard)
  @Post()
  crear(@Body() datosLibro: Partial<Libro>) {
    return this.librosService.crear(datosLibro);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  actualizar(@Param('id', ParseIntPipe) id: number, @Body() datosLibro: Partial<Libro>) {
    return this.librosService.actualizar(id, datosLibro);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.librosService.eliminar(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('imagen/:id')
  @UseInterceptors(FileInterceptor('portada', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const nombreUnico = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, nombreUnico + extname(file.originalname)); 
      }
    })
  }))
  subirImagen(@Param('id', ParseIntPipe) id: number, @UploadedFile() file: Express.Multer.File) {
    return this.librosService.actualizar(id, { imagenUrl: file.filename });
  }
}