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
exports.AdminMiddleware = void 0;
const Erros_1 = require("../Erros");
const prisma_1 = require("../prisma");
class AdminMiddleware {
    checarAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nome, email, senha } = req.body;
                if (!nome || !email || !senha) {
                    throw new Erros_1.BadRequestError("Os campos são obrigatórios");
                }
                const admin = yield prisma_1.prisma.admin.findUnique({ where: { email: email } });
                if (admin) {
                    throw new Erros_1.ConflictError("O usuário administrador já existe");
                }
                next();
            }
            catch (erro) {
                if (erro instanceof Erros_1.BadRequestError ||
                    erro instanceof Erros_1.InternalServerError ||
                    erro instanceof Erros_1.ConflictError) {
                    res.status(erro.statusCode).json({ erro: erro.message });
                }
            }
        });
    }
}
exports.AdminMiddleware = AdminMiddleware;
