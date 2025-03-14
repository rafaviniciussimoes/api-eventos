"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../prisma");
class CompraControlador {
    cadastrarCompra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idEvento, idUsuario } = req.body;
            const compra = yield prisma_1.prisma.compra.create({
                data: {
                    eventoId: idEvento,
                    usuarioId: idUsuario,
                },
            });
            res.status(201).json(compra);
        });
    }
    listarCompras(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { comprovante } = req.query;
            const idUsuario = String(comprovante).split("/")[1];
            const compras = yield prisma_1.prisma.compra.findMany({
                where: { id: idUsuario },
            });
            res.json(compras);
        });
    }
    deletarCompra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idCompra } = req.params;
            yield prisma_1.prisma.compra.delete({
                where: { id: idCompra },
            });
            res.status(204).send();
        });
    }
}
exports.default = CompraControlador;
