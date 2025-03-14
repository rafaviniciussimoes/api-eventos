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
class UsuarioMiddleware {
    checarUsuario(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, email, senha } = req.body;
            try {
                if (!nome || !email || !senha) {
                    throw new Erros_1.BadRequestError("Todos os campos são obrigatórios");
                }
                const usuario = yield prisma_1.prisma.usuario.findUnique({
                    where: { email: email },
                });
                if (usuario) {
                    throw new Erros_1.ConflictError("Usuário já cadastrado");
                }
                console.log("Estou no middleware");
                next();
            }
            catch (erro) {
                if (erro instanceof Erros_1.BadRequestError ||
                    erro instanceof Erros_1.ConflictError ||
                    erro instanceof Erros_1.InternalServerError) {
                    res.status(erro.statusCode).json({ mensagem: erro.message });
                }
            }
        });
    }
    deletarUsuario(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUsuario } = req.params;
            try {
                if (!idUsuario) {
                    throw new Erros_1.BadRequestError("O campo idUsuario é obrigatório");
                }
                const usuario = yield prisma_1.prisma.usuario.findUnique({
                    where: { id: idUsuario },
                });
                if (!usuario) {
                    throw new Erros_1.NotFoundError("Usuário não encontrado");
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
exports.default = UsuarioMiddleware;
