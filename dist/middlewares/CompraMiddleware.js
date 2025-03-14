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
const Erros_1 = require("../Erros");
const prisma_1 = require("../prisma");
class CompraMiddleware {
    checarCamposCompra(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idEvento, idUsuario } = req.body;
            try {
                if (!idEvento || !idUsuario) {
                    throw new Erros_1.BadRequestError("Todos os campos são obrigatórios");
                }
                const evento = yield prisma_1.prisma.evento.findUnique({
                    where: { id: idEvento },
                });
                if (!evento) {
                    throw new Erros_1.NotFoundError("Evento não encontrado");
                }
                const usuario = yield prisma_1.prisma.usuario.findUnique({
                    where: { id: idUsuario },
                });
                if (!usuario) {
                    throw new Erros_1.UnauthorizedError("Usuário não encontrado");
                }
                next();
            }
            catch (erro) {
                if (erro instanceof Erros_1.BadRequestError ||
                    erro instanceof Erros_1.NotFoundError ||
                    erro instanceof Erros_1.UnauthorizedError ||
                    erro instanceof Erros_1.InternalServerError) {
                    res.status(erro.statusCode).json({ mensagem: erro.message });
                }
            }
        });
    }
    checarCompra(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idCompra } = req.params;
                if (!idCompra) {
                    throw new Erros_1.BadRequestError("Oarâmetro idCompra é obrigatório");
                }
                const compra = yield prisma_1.prisma.compra.findFirst({
                    where: { id: idCompra },
                });
                if (!compra) {
                    throw new Erros_1.NotFoundError("Compra não encontrada");
                }
                next();
            }
            catch (erro) {
                if (erro instanceof Erros_1.NotFoundError ||
                    erro instanceof Erros_1.BadRequestError ||
                    erro instanceof Erros_1.InternalServerError) {
                    res.status(erro.statusCode).json({ mensagem: erro.message });
                }
            }
        });
    }
}
exports.default = CompraMiddleware;
