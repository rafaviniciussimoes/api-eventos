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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GerarToken = void 0;
const prisma_1 = require("../prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Erros_1 = require("../Erros");
class GerarToken {
    token(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, senha } = req.body;
                if (!email || !senha) {
                    throw new Erros_1.BadRequestError("As credenciais são obrigatórias");
                }
                const admin = yield prisma_1.prisma.admin.findUnique({
                    where: { email: email },
                });
                if (!admin) {
                    throw new Erros_1.NotFoundError("Administrador não encontrado");
                }
                const senhaValida = yield bcrypt_1.default.compare(senha, admin.senha);
                if (!senhaValida) {
                    throw new Erros_1.ForbbidenError("Credenciais incorretas");
                }
                const token = jsonwebtoken_1.default.sign({ id: admin.id }, `${process.env.JWT_SECRET}`, {
                    expiresIn: "12h",
                });
                res.json({ token: token });
            }
            catch (erro) {
                if (erro instanceof Erros_1.BadRequestError ||
                    erro instanceof Erros_1.NotFoundError ||
                    erro instanceof Erros_1.ForbbidenError) {
                    res.status(erro.statusCode).json({ mensagem: erro.message });
                }
            }
        });
    }
}
exports.GerarToken = GerarToken;
