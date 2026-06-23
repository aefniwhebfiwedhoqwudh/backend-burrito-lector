"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibrosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const libro_entity_1 = require("./libro.entity");
let LibrosService = class LibrosService {
    librosRepository;
    constructor(librosRepository) {
        this.librosRepository = librosRepository;
    }
    async obtenerTodos() {
        return this.librosRepository.find();
    }
    async obtenerPorId(id) {
        const libro = await this.librosRepository.findOne({ where: { id } });
        if (!libro)
            throw new common_1.NotFoundException('Libro no encontrado');
        return libro;
    }
    async crear(datosLibro) {
        const nuevoLibro = this.librosRepository.create(datosLibro);
        return this.librosRepository.save(nuevoLibro);
    }
    async actualizar(id, datosLibro) {
        await this.obtenerPorId(id);
        await this.librosRepository.update(id, datosLibro);
        return this.obtenerPorId(id);
    }
    async eliminar(id) {
        const libro = await this.obtenerPorId(id);
        await this.librosRepository.remove(libro);
    }
};
exports.LibrosService = LibrosService;
exports.LibrosService = LibrosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(libro_entity_1.Libro)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LibrosService);
//# sourceMappingURL=libros.service.js.map