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
class EventoMiddleware {
    checarEvento(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, endereco, data, preco } = req.body;
            try {
                if (!nome || !endereco || !data || !preco) {
                    throw new Erros_1.BadRequestError("Todos os campos são obrigatórios");
                }
                const evento = yield prisma_1.prisma.evento.findFirst({ where: { nome: nome } });
                if (evento) {
                    throw new Erros_1.ConflictError("Evento já cadastrado");
                }
                next();
            }
            catch (erro) {
                if (erro instanceof Erros_1.BadRequestError ||
                    erro instanceof Erros_1.ConflictError ||
                    erro instanceof Erros_1.InternalServerError) {
                    res.status(erro.statusCode).json({ message: erro.message });
                }
            }
        });
    }
    checarEventoPorPreco(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { maxPreco } = req.query;
            try {
                if (!maxPreco) {
                    throw new Erros_1.BadRequestError("O campo maxPreco não foi informado");
                }
                if (isNaN(Number(maxPreco)) || Number(maxPreco) < 0) {
                    throw new Erros_1.BadRequestError("O preço máximo do evento deve conter apenas números e deve ser positivo");
                }
                next();
            }
            catch (erro) {
                if (erro instanceof Erros_1.BadRequestError ||
                    erro instanceof Erros_1.InternalServerError) {
                    res.status(erro.statusCode).json({ mensagem: erro.message });
                }
            }
        });
    }
    deletarEvento(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idEvento } = req.params;
                if (!idEvento) {
                    throw new Erros_1.BadRequestError("O parâmetro idEvento é obrigatório");
                }
                const evento = yield prisma_1.prisma.evento.findFirst({ where: { id: idEvento } });
                if (!evento) {
                    throw new Erros_1.NotFoundError("Evento não encontrado");
                }
                next();
            }
            catch (erro) {
                if (erro instanceof Erros_1.BadRequestError ||
                    erro instanceof Erros_1.NotFoundError ||
                    erro instanceof Erros_1.InternalServerError) {
                    res.status(erro.statusCode).json({ mensagem: erro.message });
                }
            }
        });
    }
}
exports.default = EventoMiddleware;
