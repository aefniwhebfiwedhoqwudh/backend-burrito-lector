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
  UseGuards
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { LibrosService } from './libros.service';
import { Libro } from './libro.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Importamos el Guard de seguridad

@Controller('libros')
export class LibrosController {
  constructor(private readonly librosService: LibrosService) {}

  // ==========================================
  // RUTAS PÚBLICAS (Cualquiera puede verlas)
  // ==========================================

  @Get()
  obtenerTodos() {
    return this.librosService.obtenerTodos();
  }

  @Get(':id')
  obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return this.librosService.obtenerPorId(id);
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

  // Ruta PROTEGIDA para manejar archivos (Imágenes)
  @UseGuards(JwtAuthGuard)
  @Post('imagen/:id')
  @UseInterceptors(FileInterceptor('portada', {
    storage: diskStorage({
      destination: './uploads', // La carpeta donde caerán las fotos
      filename: (req, file, cb) => {
        // Genera un nombre único para que no se sobreescriban fotos con el mismo nombre
        const nombreUnico = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, nombreUnico + extname(file.originalname)); 
      }
    })
  }))
  subirImagen(@Param('id', ParseIntPipe) id: number, @UploadedFile() file: Express.Multer.File) {
    // Guarda el nombre del archivo en la base de datos
    return this.librosService.actualizar(id, { imagenUrl: file.filename });
  }
}