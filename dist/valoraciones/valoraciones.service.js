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
exports.ValoracionesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const valoracion_entity_1 = require("./valoracion.entity");
let ValoracionesService = class ValoracionesService {
    valoracionesRepo;
    constructor(valoracionesRepo) {
        this.valoracionesRepo = valoracionesRepo;
    }
    async calificarLibro(usuarioId, libroId, puntuacion) {
        const nuevaValoracion = this.valoracionesRepo.create({ usuarioId, libroId, puntuacion });
        return this.valoracionesRepo.save(nuevaValoracion);
    }
    async calcularAfinidad(miUsuarioId) {
        const todas = await this.valoracionesRepo.find();
        const misValoraciones = todas.filter(v => v.usuarioId === miUsuarioId);
        const afinidades = [];
        const otrosUsuariosIds = [...new Set(todas.map(v => v.usuarioId))].filter(id => id !== miUsuarioId);
        for (const otroId of otrosUsuariosIds) {
            const susValoraciones = todas.filter(v => v.usuarioId === otroId);
            let similitud = 0;
            let coincidencias = 0;
            for (const miVal of misValoraciones) {
                const suVal = susValoraciones.find(v => v.libroId === miVal.libroId);
                if (suVal) {
                    coincidencias++;
                    const diferencia = Math.abs(miVal.puntuacion - suVal.puntuacion);
                    similitud += (5 - Math.abs(diferencia));
                }
            }
            if (coincidencias > 0) {
                const porcentajeAfinidad = (similitud / (coincidencias * 5)) * 100;
                if (porcentajeAfinidad >= 75) {
                    afinidades.push({ usuarioId: otroId, afinidad: porcentajeAfinidad, librosEnComun: coincidencias });
                }
            }
        }
        return afinidades.sort((a, b) => b.afinidad - a.afinidad);
    }
};
exports.ValoracionesService = ValoracionesService;
exports.ValoracionesService = ValoracionesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(valoracion_entity_1.Valoracion)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ValoracionesService);
//# sourceMappingURL=valoraciones.service.js.map