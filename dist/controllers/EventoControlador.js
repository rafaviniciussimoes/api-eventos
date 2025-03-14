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
class EventoControlador {
    mostrarEvento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { maxPreco } = req.query;
            const eventos = yield prisma_1.prisma.evento.findMany({
                where: {
                    preco: {
                        lte: Number(maxPreco),
                    },
                },
            });
            res.json(eventos);
        });
    }
    cadastrarEvento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, endereco, data, preco } = req.body;
            const evento = yield prisma_1.prisma.evento.create({
                data: {
                    nome,
                    endereco,
                    data,
                    preco,
                },
            });
            res.status(201).json(evento);
        });
    }
    excluirEvento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idEvento } = req.params;
            yield prisma_1.prisma.evento.delete({ where: { id: idEvento } });
            res.status(204).send();
        });
    }
}
exports.default = EventoControlador;
