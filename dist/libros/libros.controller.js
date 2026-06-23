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
exports.LibrosController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const libros_service_1 = require("./libros.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let LibrosController = class LibrosController {
    librosService;
    constructor(librosService) {
        this.librosService = librosService;
    }
    obtenerTodos() {
        return this.librosService.obtenerTodos();
    }
    obtenerPorId(id) {
        return this.librosService.obtenerPorId(id);
    }
    crear(datosLibro) {
        return this.librosService.crear(datosLibro);
    }
    actualizar(id, datosLibro) {
        return this.librosService.actualizar(id, datosLibro);
    }
    eliminar(id) {
        return this.librosService.eliminar(id);
    }
    subirImagen(id, file) {
        return this.librosService.actualizar(id, { imagenUrl: file.filename });
    }
};
exports.LibrosController = LibrosController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LibrosController.prototype, "obtenerTodos", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LibrosController.prototype, "obtenerPorId", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LibrosController.prototype, "crear", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], LibrosController.prototype, "actualizar", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LibrosController.prototype, "eliminar", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('imagen/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('portada', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const nombreUnico = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, nombreUnico + (0, path_1.extname)(file.originalname));
            }
        })
    })),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], LibrosController.prototype, "subirImagen", null);
exports.LibrosController = LibrosController = __decorate([
    (0, common_1.Controller)('libros'),
    __metadata("design:paramtypes", [libros_service_1.LibrosService])
], LibrosController);
//# sourceMappingURL=libros.controller.js.map